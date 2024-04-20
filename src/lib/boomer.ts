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
	{ '@'?: MediaQueries } &
	Partial<{
		[selector: `${string}&${string}`]: CSSRules
	}>

type VariantName = string
type VariantValue = string

type Variants = Record<VariantName, Record<VariantValue, CSSRules>>
type Token = {
	value: string, // blue
	token: string, // var(--color-primary)
	variable: string, // --color-primary
	toString: () => string
}

function jsNameToCssName(name: string) {
	return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function buildPayload(payload: CSSPayload) {
	return `${Object.entries(payload).map(([property, value]) => {
		return `${jsNameToCssName(property)}: ${value};`
	}).join('\n')}`
}

function buildCSS(styles: CSSRules, selector?: string) {
	let cssCode = ''
	for (const [property, value] of Object.entries(styles)) {
		if (property.includes('&')) {
			cssCode += `${property} {${buildCSS((value) as CSSRules)}}`
			continue;
		}
		if (property === '@') {
			for (const mediaRule in styles["@"]) {
				cssCode += `@${mediaRule} {${buildCSS(styles["@"][mediaRule], selector)}}`
			}
		}
	}
	cssCode += selector ? `${selector} {${buildPayload(styles)}}` : buildPayload(styles)
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
	name?: string
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
	let className = `bmr-${name ? name : ''}${hash(cssOut)}`
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

export function globalCSS() { }

type CSSVars = {
	colors: Record<string, string>
	// Using sizes, uncomment if you like Spaces
	//space: Record<string,string>
	fontSizes: Record<string, string>
	fonts: Record<string, string>
	fontWeights: Record<string, string>
	lineHeights: Record<string, string>
	letterSpacings: Record<string, string>
	sizes: Record<string, string>
	borderWidths: Record<string, string>
	borderStyles: Record<string, string>
	radii: Record<string, string>
	shadows: Record<string, string>
	zIndices: Record<string, string>
	transitions: Record<string, string>
}

type CSSTokens = {
	colors: Record<string, Token>
	// Using sizes, uncomment if you like Spaces
	//space: Record<string,Token>
	fontSizes: Record<string, Token>
	fonts: Record<string, Token>
	fontWeights: Record<string, Token>
	lineHeights: Record<string, Token>
	letterSpacings: Record<string, Token>
	sizes: Record<string, Token>
	borderWidths: Record<string, Token>
	borderStyles: Record<string, Token>
	radii: Record<string, Token>
	shadows: Record<string, Token>
	zIndices: Record<string, Token>
	transitions: Record<string, Token>
}

type Options<TQueries extends Record<string, string>> = {
	'media': TQueries,
	theme: Record<'base', Partial<CSSVars>> & Partial<Record<keyof TQueries, Partial<CSSVars>>>,

}


function createToken(category: string, name: string, value: string | number) {
	return {
		value: value.toString(),
		token: `--bmr-${category}-${name}`,
		var: `var(--bmr-${category}-${name})`
	}
}
export function config<TQueries extends Record<string, string>>(this: MacroContext | void, options: Options<TQueries>) {
	const defaultTheme: Partial<CSSTokens> = {}
	for (const category in options.theme.base) {
		defaultTheme[(category as keyof CSSVars)] = {}
		for (const token in options.theme.base[category]) {
			defaultTheme[category][token] = createToken(category, token, options.theme.base[category][token])
		}

	}


	return { 'media': options.media, theme: defaultTheme }
}


const { media, theme } = config({
	media: {
		dark: "(prefers-color-scheme: dark)",
		light: "(prefers-color-scheme: light)",
		smallScreen: "(max-width: 499px)",
		normalScreen: "(min-width: 500px)",
		largeScreen: "(min-width: 1000px)",
		withoutAnimation: "(prefers-reduced-motion)",
		print: "(print)",
	},
	theme: {
		base: {
			colors: {
				text: 'red'
			}
		},
		print: {

			colors: {
				test: 'blue',
				text: 'yellow'
			}
		}

	}
})
console.log('theme', theme)
export function keyframes() { }

// Usefulness debatable
export function createTheme() { }
