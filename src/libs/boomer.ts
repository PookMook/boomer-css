/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import type { queries, themeTypeForV} from '../css/theme';
import type { MacroContext } from '@parcel/macros'

import fs from 'fs';

function hash(string: string) {
	let hash = 0,
		i: number, chr: number;
	if (string.length === 0) return hash;
	for (i = 0; i < string.length; i++) {
		chr = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	const hashStr = hash.toString(36);
	return hashStr.startsWith('-') ? hashStr.slice(1) : hashStr;
}

// Extra CSS declarations that are not part of the CSSStyleDeclaration interface, add to your liking
type ExtraCSSDeclaration = 
 | 'WebkitFontSmoothing'
 | 'MozOsxFontSmoothing'

type CSSValue = string | number | Token
type CSSPayload = Partial<Record<keyof CSSStyleDeclaration | ExtraCSSDeclaration, CSSValue>>
type Queries = Record<string, CSSPayload>

type CSSRules =
	CSSPayload &
	{ query?: Queries } &
	Partial<{
		[selector: `${string}&${string}`]: CSSRules
	}>

type VariantName = string
type VariantValue = string

type Variants = Record<VariantName, Record<VariantValue, CSSRules>>
type Token = {
	value: string, // blue
	variable: string, // var(--color-primary)
	token: string, // --color-primary
}

function jsNameToCssName(name: string) {
	return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function buildPayload(payload: CSSPayload) {
	return `${Object.entries(payload).filter(([property]) => { return property !== 'media' && !property.includes('&') }).map(([property, value]) => {
		return `${jsNameToCssName(property)}: ${value && typeof value === "object" && 'variable' in value
			? value.variable : value}`
	}).join(';')}`
}

function buildCSS(styles: CSSRules, selector?: string) {
	let cssCode = ''

	cssCode += selector ? `${selector} {${buildPayload(styles)}}` : buildPayload(styles)
	for (const [property, value] of Object.entries(styles)) {
		if (property.includes('&')) {
			cssCode += `${property.replaceAll('&', selector || '&')} {${buildCSS((value) as CSSRules)}}`
			continue;
		}
		if (property === 'query') {
			for (const queryRule in styles["query"]) {
				cssCode += `${queryRule} {${buildCSS(styles["query"][queryRule]!, selector)}}`
			}
		}
	}
	return cssCode
}
export function css<TVariants extends Variants>(
	this: MacroContext | void,
	styles: {
		base?: CSSRules,
		variants?: TVariants,
		compoundVariants?: TVariants extends Record<string, unknown>
		? Array<{
			variants: Partial<{ [TVariant in keyof TVariants]: keyof TVariants[TVariant] | Array<keyof TVariants[TVariant]> }>,
			styles: CSSRules
		}>
		: never
	},
	options: { name?: string }
): (variants?: TVariants extends Record<string, unknown> ? Partial<{ [TKey in keyof TVariants]: keyof TVariants[TKey] | (TVariants[TKey] extends { true: unknown } ? true : never) | (TVariants[TKey] extends { false: unknown } ? false : never) }> : undefined) => string {
	let cssOut = `@layer base {${styles.base ? buildCSS(styles.base, '.&') : ''}}`
	if (styles.variants) {
		cssOut += `@layer variants {${Object.keys(styles.variants).map(
			(variantName) => {
				return Object.entries(styles.variants![variantName]!).map(
					([variantValue, value]) => buildCSS(value, `.&.__${variantName}_${variantValue}`)
				).join('\n')
			}
		).join('\n')}}`
	}
	if (styles.variants && styles.compoundVariants) {
		cssOut += `@layer compoundVariants{${styles.compoundVariants.map(compound => {
			return `${Object.entries(compound.variants).map(([key, value]) => {
				return `.&:is(${(Array.isArray(value) ? value : [value]).map(value => `.__${key}_${value}`).join(',')
					})`
			}).join('')}{${buildCSS(compound.styles)}}`
		}).join('')}}`

	}
	const className = `${options.name ? options.name+'-' : ''}${hash(cssOut)}`
	cssOut = cssOut.replaceAll('&', className)
	if (this?.addAsset) {
		this.addAsset({
			type: 'css',
			content: cssOut
		});
	}
	else {
		throw new Error('You need to make sure to import css function via `with {type: \'macro\'}`')
	}

	return new Function('variants',
		'if(!variants)return "' + className + '" ;return `' + className + ' ${Object.entries(variants).map(([key, value]) => {' +
		'const processedValue = typeof value === "boolean" ? String(value) : value;' +
		'return `__${key}_${processedValue}`;' +
		'}).join(" ")}`'
	) as ReturnType<typeof css>;
}

export function styled<TTag extends keyof JSX.IntrinsicElements, TVariants extends Variants>(
	this: MacroContext | void,
	tag: TTag,
	styles: {
		base?: CSSRules,
		variants?: TVariants,
		compoundVariants?: TVariants extends Record<string, unknown>
		? Array<{
			variants: Partial<{ [TVariant in keyof TVariants]: keyof TVariants[TVariant] | Array<keyof TVariants[TVariant]> }>,
			styles: CSSRules
		}>
		: never
	},
	options: { name?: string } = {}
): React.ForwardRefExoticComponent<React.PropsWithoutRef<React.ComponentPropsWithoutRef<TTag> & 
	(TVariants extends Record<string, unknown>
		? Partial<{ [TKey in keyof TVariants as `$${string & TKey}`]: keyof TVariants[TKey] 
		| (TVariants[TKey] extends { true: unknown } ? boolean : never)
		| (TVariants[TKey] extends { false: unknown } ? boolean : never) }
		>
		: {})> & React.RefAttributes<React.ElementRef<TTag>>> {
	let cssOut = `@layer base {${styles.base ? buildCSS(styles.base, '.&') : ''}}`
	if (styles.variants) {
		cssOut += `@layer variants {${Object.keys(styles.variants).map(
			(variantName) => {
				return Object.entries(styles.variants![variantName]!).map(
					([variantValue, value]) => buildCSS(value, `.&.__${variantName}_${variantValue}`)
				).join('\n')
			}
		).join('\n\n')}}`
	}
	if (styles.variants && styles.compoundVariants) {
		cssOut += `@layer compoundVariants{${styles.compoundVariants.map(compound => {
			return `${Object.entries(compound.variants).map(([key, value]) => {
				return `.&:is(${(Array.isArray(value) ? value : [value]).map(value => `.__${key}_${value}`).join(',')
					})`
			}).join('')}{${buildCSS(compound.styles)}}`
		}).join('')}}`

	}
	const className = `${options.name ? options.name+'-' : ''}${hash(cssOut)}`
	cssOut = cssOut.replaceAll('&', className)

	if (this?.addAsset) {
		 this.addAsset({
			type: 'css',
			content: cssOut
		});
	} else {
		throw new Error('You need to make sure to import styled function via `with {type: \'macro\'}`')
	}

	return new Function('props', `const {className: userClassName, ...rest} = props;
		const variantClassNames = Object.entries(rest)
			.filter(([key]) => key.startsWith('$'))
			.map(([key, value]) => \`__\${key.slice(1)}_\${value}\`)
			.join(' ');
		const generatedClassName = '${className}' + (variantClassNames ? ' '+ variantClassNames : '') + (userClassName ? ' '+ userClassName : '');
		const Element = React.createElement('${tag}', {
			className: generatedClassName,
			...rest,
		});
		return Element
	`) as ReturnType<typeof styled>
}




export function globalCSS(this: MacroContext | void,
	resets: Record<string, CSSPayload>) {
	let cssOut = '@layer reset{'
	for(const reset in resets){
		cssOut += `${reset} {${buildCSS(resets[reset]!)}}`
	}
	cssOut += '}'
		
	if (this?.addAsset) {
		// If you prefer to not write the css to a file, uncomment this line
		/* this.addAsset({
			type: 'css',
			content: cssOut
		}); */
		
		fs.writeFileSync('src/css/global.css', cssOut)
	}
	else {
		throw new Error('You need to make sure to import css function via `with {type: \'macro\'}`')
	}
}

type CSSThing<Thing extends string | Token> = Partial<{
	colors: Record<string, Thing>
	// Using sizes, uncomment if you like Spaces
	//space: Record<string,string>
	fontSizes: Record<string, Thing>
	fonts: Record<string, Thing>
	fontWeights: Record<string, Thing>
	lineHeights: Record<string, Thing>
	letterSpacings: Record<string, Thing>
	sizes: Record<string, Thing>
	borders: Record<string, Thing>
	borderWidths: Record<string, Thing>
	borderStyles: Record<string, Thing>
	radii: Record<string, Thing>
	shadows: Record<string, Thing>
	zIndices: Record<string, Thing>
	transitions: Record<string, Thing>
	layouts: Record<string, Thing>
}>

type Options<TQueries extends Record<string, string>, TTheme extends CSSThing<string>> = {
	'queries': TQueries,
	theme: Record<'base', TTheme> & Partial<Record<keyof TQueries, CSSThing<string>>>,
}

export function createConfig
	<const TQueries extends Record<string, string>, TTheme extends CSSThing<string>>
	(this: MacroContext | void, options: Options<TQueries, TTheme>): 
	{ 
		queries: TQueries, 
		queriesTypeForM: TQueries ,
		theme: { [TCategory in keyof TTheme]: Record<keyof TTheme[TCategory], Token> }, 
		themeTypeForV: { [TCategory in keyof TTheme]: Record<keyof TTheme[TCategory], string> } } {
	// Here we make Typescript lie, Make sure the end of those loops match this type forever or bad stuff happens
	const defaultTheme = {} as { [TCategory in keyof TTheme]: Record<keyof TTheme[TCategory], Token> }

	// Here we are just interested in the types exported to populate the v function options
	const themeTypeForV = {} as { [TCategory in keyof TTheme]: Record<keyof TTheme[TCategory], string> }

	// Here we are just interested in the types exported to populate the m function options
	const queriesTypeForM = {} as { [TCategory in keyof TQueries]: TQueries[TCategory] }


	let cssOut = '@layer tokenMedia{'
	let cssBaseOut = '@layer tokenBase, tokenMedia, reset, base, variants, compoundVariants; @layer tokenBase {:root{'

	for (const themeMedia in options.theme) {
		if (themeMedia !== 'base') {
			cssOut += `@${options.queries[themeMedia]}{:root{`
		}
		for (const [category, tokensObject] of Object.entries(options.theme[themeMedia] as Record<string, CSSThing<string>>)) {
			if (themeMedia === 'base') defaultTheme[(category as keyof TTheme)] = {} as any
			for (const [tokenName, tokenValue] of Object.entries(tokensObject)) {
				const token = `--bmr-${category}-${tokenName}`
				const variable = `var(${token})`
				if (themeMedia === 'base') (defaultTheme[(category as keyof TTheme)] as any)[tokenName] = {
					value: tokenValue.toString(),
					token,
					variable
				}
				if (themeMedia === 'base') { cssBaseOut += `${token}: ${tokenValue};` }
				else { cssOut += `${token}: ${tokenValue};` }
			}
		}
		if (themeMedia !== 'base') {
			cssOut += '}}'
		}
	}

	cssOut += '}'

	cssBaseOut += '}}'

	if (this?.addAsset) {
		// If you prefer to not write the css to a file, uncomment this line
		/* this.addAsset({
			type: 'txt',
			content: cssBaseOut + cssOut
		}); */

		fs.writeFileSync('src/css/config.css', cssBaseOut + cssOut)
	}
	else {
		throw new Error('You need to make sure to import makeConfig function via `with {type: \'macro\'}`')
	}

	return { 'queries': options.queries, theme: defaultTheme, themeTypeForV, queriesTypeForM }
}

type KeyframesProps = Record<string,CSSPayload>
export function keyframes(this: MacroContext | void,frames: KeyframesProps, name: string): string { 

    let cssOut = '@keyframes & {'
    for (const [frame, CSSPayload] of Object.entries(frames)) {
        cssOut += `${frame}{${buildPayload(CSSPayload)}}`
    }
    cssOut += '}'
	const animationName = `bmr-${name}${hash(cssOut)}`
	cssOut = cssOut.replaceAll('&', animationName)

	if (this?.addAsset) {
		this.addAsset({
			type: 'css',
			content: cssOut
		});
	}

    return animationName
}

type Path<T> = keyof T extends string
  ? {
      [K in keyof T]: K extends string
        ? unknown extends T[K]
          ? never
          : T[K] extends Record<string, any>
            ? `${K}.${Path<T[K]>}`
            : K
        : never
    }[keyof T]
  : never;

// create the css variable
export function v(token: Path<typeof themeTypeForV>, fallback?: string){
	return `var(--bmr-${token.replaceAll('.', '-')}${fallback? `, ${fallback}`:''})`
}

export function q<K extends keyof typeof queries>(mediaQuery: K extends keyof typeof queries ? `${K}/${(typeof queries)[K]}` : never) {
	return `@${mediaQuery.split('/')[1]}`
}

export function createTheme(this: MacroContext | void, name: string, theme: Partial<{
  [K in keyof typeof themeTypeForV]: Partial<(typeof themeTypeForV)[K]>
}>) {
  let cssOut = `.${name} {`
  
  for (const [category, tokens] of Object.entries(theme)) {
    for (const [tokenName, value] of Object.entries(tokens)) {
      cssOut += `--bmr-${category}-${tokenName}: ${value};`
    }
  }
  
  cssOut += '}'

  if (this?.addAsset) {
    this.addAsset({
      type: 'css',
      content: cssOut
    })
  } else {
    throw new Error('You need to make sure to import createTheme function via `with {type: \'macro\'}`')
  }

  return name
}