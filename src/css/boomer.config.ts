import { createConfig, globalCSS, v} from '@/libs/boomer' with {type: 'macro'}

export const { queries, themeTypeForV } = createConfig({
    queries: {
        print: "media print",
        light: 'media (prefers-color-scheme: light)',
        dark: 'media (prefers-color-scheme: dark)',
        tablet: 'media screen',
        desktop: 'media screen and (min-width:1200px)',
    },
    theme: {
        base: {
            sizes: {
                paperGap: '1in',
                paperHeight: '11in',
                paperWidth: '8.5in',
                bufferx: '0.5in',
                bufferxHalf: "0.25in",
                buffery: '0.67in',
                paddingTitleY: "0.25in",
                paddingSection: "0.125in",
                inSectionPadding: "0.125in",
                inArticleGap: "0.07in",
            },
            colors: {
                appBackground: '#F8F8F8',
                paperBackground: '#FFFFFF',
                title: '#575757',
                text: '#575757',
                sidebar: '#f8f8f8',
                level3: "#5472E4",
                level4: "#B658C4",
                level5: "#2A7E3B",
            },
            fonts: {
                hkg: 'hkg',
                roboto: 'roboto',
            },
            fontSizes: {
                h1: '28.2pt',
                h2: '11.3pt',
                h3: '11.3pt',
                h4: '10.3pt',
                text: '7.5pt'
            },
            borderStyles: {
                normal: '1px solid #575757'
            }
        },
        print: {
            sizes: {
                paperGap: '0',
            }
        },
        dark: {
            colors: {
                appBackground: '#1c1e1f',
                paperBackground: '#181a1b',
                title: '#b1aaa0',
                text: '#b1aaa0',
                sidebar: '#1c1e1f',
                level3: "#5472E4",
                level4: "#B658C4",
                level5: "#71D083",
            }
        }
    }
})

globalCSS({
    "*, *::before, *::after": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
    },
    "@page": {
        //@ts-expect-error
        size: "8.5in 11in",
        margin: 0
    },
    body: {
        fontSize: "100%",
        lineHeight: 1.5,
        padding: v('sizes.paperGap'),
        fontFamily: v('fonts.roboto'),
        backgroundColor: v('colors.appBackground'),
    },
    "img, picture, video, canvas, svg": {
        display: "block",
        maxWidth: "100%",
    },
    "input, button, textarea, select": {
        font: "inherit",
    },
    "p, h1, h2, h3, h4, h5, h6, li": {
        overflowWrap: "break-word",
        color: v('colors.text')
    },
    "h1, h3": {
        fontFamily: v('fonts.hkg'),
        fontWeight: '600',
    },
    "h2, h4, h5, li": {
        fontFamily: v('fonts.roboto'),
    },
    h1: {
        fontSize: v('fontSizes.h1'),
        textTransform: "uppercase",
        letterSpacing: '7pt',
        fontWeight: '600',
    },
    h2: {
        fontSize: v('fontSizes.h2'),
        textTransform: "uppercase",
        letterSpacing: '7pt',
        fontWeight: '600',
    },
    h3: {
        fontSize: v('fontSizes.h3'),
        textTransform: "uppercase",
        fontWeight: '600',
        letterSpacing: '3pt',
        paddingBlockEnd: v('sizes.inSectionPadding')
    },
    h4: {
        fontSize: v('fontSizes.h4'),
    },
    h5: {
        fontSize: v('fontSizes.text'),
    },
    "p, li": {
        fontSize: v('fontSizes.text'),
        paddingBlockEnd: v('sizes.inArticleGap'),
    },
    "ul, li": {
        listStyle: 'none'
    },
    "#root, #__next": {
        isolation: "isolate",
    }
})

export function run(){}