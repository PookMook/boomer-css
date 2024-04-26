import type { MacroContext } from '@parcel/macros'

function hash(string: string) {
	var hash = 0,
		i: number, chr: number;
	if (string.length === 0) return hash;
	for (i = 0; i < string.length; i++) {
		chr = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash.toString(36);
}

type CSSValue = string | number | Token
type CSSPayload = Partial<Record<keyof CSSStyleDeclaration, CSSValue>>
type MediaQueries = Record<string, CSSPayload>

type CSSRules =
	CSSPayload &
	{ media?: MediaQueries } &
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
	for (const [property, value] of Object.entries(styles)) {
		if (property.includes('&')) {
			cssCode += `${property} {${buildCSS((value) as CSSRules)}}`
			continue;
		}
		if (property === 'media') {
			for (const mediaRule in styles["media"]) {
				cssCode += `@${mediaRule} {${buildCSS(styles["media"][mediaRule], selector)}}`
			}
		}
	}
	console.log("cssCode", cssCode)
	cssCode += selector ? `${selector} {${buildPayload(styles)}}` : buildPayload(styles)

	console.log("cssCode2", cssCode)
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
): (variants: TVariants extends Record<string, unknown> ? Partial<{ [TKey in keyof TVariants]: keyof TVariants[TKey] }> : undefined) => string {
	let cssOut = `@layer base {${styles.base ? buildCSS(styles.base, '.&') : ''}}`
	if (styles.variants) {
		cssOut += `@layer variants {${Object.keys(styles.variants).map(
			(variantName) => {
				return Object.entries(styles.variants![variantName]!).map(
					([variantValue, value]) => `.&.__${variantName}_${variantValue}{${buildCSS(value)}}`
				).join('\n')
			}
		).join('\n')}}`
	}
	if (styles.variants && styles.compoundVariants) {
		cssOut += `@layer compountVariants{${styles.compoundVariants.map(compound => {
			return `${Object.entries(compound.variants).map(([key, value]) => {
				return `.&:is(${(Array.isArray(value) ? value : [value]).map(value => `.__${key}_${value}`).join(',')
					})`
			}).join('')}{${buildCSS(compound.styles)}}`
		}).join('')}}`

	}
	let className = `bmr-${options.name ? options.name : ''}${hash(cssOut)}`
	cssOut = cssOut.replaceAll('&', className)
	console.log(cssOut)
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
		'if(!variants)return "' + className + '" ;return `' + className + ' ${Object.entries(variants).map(([key, value]) => `__${key}_${value}`).join(" ")}`'
	) as ReturnType<typeof css>;
}

export function globalCSS(resets: Record<string, CSSPayload>) {

	const cssOut = ''

	console.log(cssOut)

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
	borderWidths: Record<string, Thing>
	borderStyles: Record<string, Thing>
	radii: Record<string, Thing>
	shadows: Record<string, Thing>
	zIndices: Record<string, Thing>
	transitions: Record<string, Thing>
}>

type Options<TQueries extends Record<string, string>, TTheme extends CSSThing<string>> = {
	'media': TQueries,
	theme: Record<'base', TTheme> & Partial<Record<keyof TQueries, CSSThing<string>>>,
}

export function createConfig
	<TQueries extends Record<string, string>, TTheme extends CSSThing<string>>
	(this: MacroContext | void, options: Options<TQueries, TTheme>): { media: TQueries, theme: { [TCategory in keyof TTheme]: Record<keyof TTheme[TCategory], Token> } } {
	// Here we make Typescript lie, Make sure the end of those loops match this type forever or bad stuff happens
	const defaultTheme = {} as { [TCategory in keyof TTheme]: Record<keyof TTheme[TCategory], Token> }

	let cssOut = '@layer tokenMedia{'
	let cssBaseOut = '@layer tokenBase, tokenMedia; @layer tokenBase {:root{'

	for (const themeMedia in options.theme) {
		if (themeMedia !== 'base') {
			cssOut += `@${options.media[themeMedia]}{:root{`
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

	console.log(cssBaseOut + cssOut)
	if (this?.addAsset) {
		this.addAsset({
			type: 'css',
			content: cssBaseOut + cssOut
		});
	}
	else {
		throw new Error('You need to make sure to import makeConfig function via `with {type: \'macro\'}`')
	}

	return { 'media': options.media, theme: defaultTheme }
}

export function keyframes() { }

// Usefulness debatable
export function createTheme() { }
