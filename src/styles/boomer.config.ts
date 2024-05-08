import { createConfig, css } from '@/lib/boomer' with {type: 'macro'}

export const config = createConfig({
	media: {
		dark: "media screen and (prefers-color-scheme: dark)",
		light: "media screen and (prefers-color-scheme: light)",
		smallScreen: "media screen and (max-width: 499px)",
		normalScreen: "media all and (min-width: 500px)",
		largeScreen: "media screen and (min-width: 1000px)",
		withoutAnimation: "media print, (prefers-reduced-motion)",
		print: "media print",
	},
	theme: {
		base: {
			colors: {
				text: 'red'
			}
		},
		smallScreen: {
			colors: {
				text: 'blue'
			}
		},
		normalScreen: {
			colors: {
				text: 'yellow'
			}
		},
		print: {
			colors: {
				shouldFail: 'green'
			}
		}
	}
})

export const boomer = css({
	base: {
		color: config.theme.colors.text,
		media: {
			[config.media.normalScreen]: {
				textDecoration: 'underline'
			}
		},
		paddingBlock: '2rem',
		"body .&": {
			backgroundColor: 'black',
			paddingInline: '4rem'
		}
	},
}, { name: 'title' })