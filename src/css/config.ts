import { css, createConfig, globalCSS } from '@/libs/boomer' with {type: 'macro'}

const { media, theme } = createConfig({
    media: {
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



export const bookCSS = css({
    base: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, ${theme.sizes.paperWidth.variable})`,
        alignContent: 'center',
        justifyContent: 'center',
        gap: theme.sizes.paperGap
    }
}, { name: 'book' })

export const pageCSS = css({
    base: {
        backgroundColor: theme.colors.paperBackground,
        height: theme.sizes.paperHeight,
        display: 'grid',
        outline: theme.borderStyles.normal,
        boxShadow: `0 0px 30px -10px ${theme.colors.text.variable}`,
        "media": {
            [media.print]: {
                outline: 'none'
            }
        },
    },
    variants: {
        layout: {
            experience: {
                gridTemplate: `
                "...... ...... ...... ...    ...... ......" ${theme.sizes.buffery.variable}
                "...... header header header header buffest" auto
                "buffer side   midL   midR    content buffest" 1fr
                "...... ...... ...... ...    ....... ......" ${theme.sizes.buffery.variable} /
                ${theme.sizes.bufferx.variable} 1fr ${theme.sizes.bufferxHalf.variable} ${theme.sizes.bufferxHalf.variable} 2fr ${theme.sizes.bufferx.variable} 
                `,
                "&:before": {
                    content: "''",
                    display: 'block',
                    backgroundColor: theme.colors.sidebar,
                    gridArea: 'buffer/buffer/midL/midL'
                },
            },
            portfolio: {
                gridTemplate: `
                    "...... ...... ...... ...    ...... ......" ${theme.sizes.buffery.variable}
                    "...... header header header header buffest" auto
                    "buffer content   midL   midR  side buffest" 1fr
                    "...... ...... ...... ...    ....... ......" ${theme.sizes.buffery.variable} /
                    ${theme.sizes.bufferx.variable} 2fr ${theme.sizes.bufferxHalf.variable} ${theme.sizes.bufferxHalf.variable} 1fr ${theme.sizes.bufferx.variable} 
                    `,
                "&:before": {
                    content: "''",
                    display: 'block',
                    backgroundColor: theme.colors.sidebar,
                    gridArea: 'midR/midR/buffest/buffest'
                },
            }
        }
    }
}, { name: 'page' })

export const tripleByteCSS = css({
    base: {
        display: 'grid',
        paddingBlockEnd:theme.sizes.inSectionPadding,
        gridTemplate: `
        "rank level level level level level " auto 
        "rank b1    b2    b3    b4    b5  " ${theme.fontSizes.text.variable} /
        8ch 40fr 30fr 15fr 10fr 5fr`,
        gap:theme.sizes.inArticleGap,
        "& > div:nth-child(1)":{
            backgroundColor:"var(--color1)",
            borderRadius:"7px",
            outline:"1px solid var(--color)"
        },
        "& > div:nth-child(2)":{
            backgroundColor:"var(--color2)",
            borderRadius:"7px",
            outline:"1px solid var(--color)"
        },
        "& > div:nth-child(3)":{
            backgroundColor:"var(--color3)",
            borderRadius:"7px",
            outline:"1px solid var(--color)"
        },
        "& > div:nth-child(4)":{
            backgroundColor:"var(--color4)",
            borderRadius:"7px",
            outline:"1px solid var(--color)"
        },
        "& > div:nth-child(5)":{
            backgroundColor:"var(--color5)",
            borderRadius:"7px",
            outline:"1px solid var(--color)"
        },
        "& > p:first-of-type": {
            gridArea: "level",
            borderRadius: '7px',
            color: "var(--color)",
            paddingBlockEnd:0,
        },
        "& > p:last-of-type": {
            gridArea: "rank",
            outline: "1px solid var(--color)",
            borderRadius: '7px',
            color: "var(--color)",
            paddingBlockEnd: 0,
            paddingInline:theme.sizes.inArticleGap,
            alignContent: "center",
            justifyContent: "center",
            display: "grid",
        }
    },
    variants: {
        level: {
            3: {
                "--color": theme.colors.level3.variable,
                "--color1": theme.colors.level3.variable,
                "--color2": theme.colors.level3.variable,
                "--color3": theme.colors.level3.variable,
                "--color4": "transparent",
                "--color5": "transparent",
            },
            4: {
                "--color": theme.colors.level4.variable,
                "--color1": theme.colors.level4.variable,
                "--color2": theme.colors.level4.variable,
                "--color3": theme.colors.level4.variable,
                "--color4": theme.colors.level4.variable,
                "--color5": "transparent",
            },
            5: {
                "--color": theme.colors.level5.variable,
                "--color1": theme.colors.level5.variable,
                "--color2": theme.colors.level5.variable,
                "--color3": theme.colors.level5.variable,
                "--color4": theme.colors.level5.variable,
                "--color5": theme.colors.level5.variable,
            }
        }
    }

}, { name: "triplebyte" })

export const headerCSS = css({
    base: {
        color: theme.colors.title,
        gridArea: 'header',
        paddingBlock: theme.sizes.paddingTitleY,
        textAlign: 'center',
        borderBottom: theme.borderStyles.normal
    },
}, { name: "header" })

export const articleCSS = css({
    base: {
    },
    variants: {
        type: {
            experience: {
                display: 'grid',
                gridTemplate: `"title title" auto
                "place date" auto
                "bullet bullet" auto /
                1fr 1fr`,
                paddingBlockEnd: theme.sizes.inSectionPadding,
                gap: theme.sizes.inArticleGap,
                "& > h4": {
                    gridArea: "title"
                },
                "& > h5": {
                    gridArea: "place"
                },
                "& > p": {
                    gridArea: "date",
                    justifySelf: "end"
                },
                "& > ul": {
                    gridArea: "bullet"
                },
            },
            education: {
                display: 'grid',
                gridTemplate: `"title title" auto
                "place date" auto
                "bullet bullet" auto /
                1fr 1fr`,
                paddingBlockEnd: theme.sizes.inSectionPadding,
                gap: theme.sizes.inArticleGap,
                "& > h4": {
                    gridArea: "place"
                },
                "& > h5": {
                    gridArea: "title"
                },
                "& > p": {
                    gridArea: "date",
                    justifySelf: "end"
                },
                "& > ul": {
                    gridArea: "bullet"
                },
            }
        }
    }
}, { name: "article" })

export const contentCSS = css({
    base: {
        height: "100%",
        display: 'flex',
        flexDirection: "column",
        //justifyContent: "space-between",
        "& > section:not(:last-child)": {
            borderBottom: theme.borderStyles.normal
        },
        "& > section": {
            paddingBlock: theme.sizes.inSectionPadding
        }
    },
    variants: {
        area: {
            content: {
                gridArea: 'content',
            },
            sidebar: {
                gridArea: 'side',

            }
        }
    }
}, { name: 'content' })



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
        padding: theme.sizes.paperGap,
        fontFamily: theme.fonts.roboto,
        backgroundColor: theme.colors.appBackground,
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
        color: theme.colors.text
    },
    "h1, h3": {
        fontFamily: theme.fonts.hkg,
        fontWeight: '600',
    },
    "h2, h4, h5, li": {
        fontFamily: theme.fonts.roboto,
    },
    h1: {
        fontSize: theme.fontSizes.h1,
        textTransform: "uppercase",
        letterSpacing: '7pt',
        fontWeight: '600',
    },
    h2: {
        fontSize: theme.fontSizes.h2,
        textTransform: "uppercase",
        letterSpacing: '7pt',
        fontWeight: '600',
    },
    h3: {
        fontSize: theme.fontSizes.h3,
        textTransform: "uppercase",
        fontWeight: '600',
        letterSpacing: '3pt',
        paddingBlockEnd: theme.sizes.inSectionPadding
    },
    h4: {
        fontSize: theme.fontSizes.h4,
    },
    h5: {
        fontSize: theme.fontSizes.text,
    },
    "p, li": {
        fontSize: theme.fontSizes.text,
        paddingBlockEnd: theme.sizes.inArticleGap,
    },
    "ul, li": {
        listStyle: 'none'
    },
    "#root, #__next": {
        isolation: "isolate",
    }
})