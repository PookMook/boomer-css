import { css, v, m } from '@/libs/boomer' with {type: 'macro'}

export const bookCSS = css({
    base: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, ${v('sizes.paperWidth')})`,
        alignContent: 'center',
        justifyContent: 'center',
        gap: v('sizes.paperGap')
    }
}, { name: 'book' })

export const pageCSS = css({
    base: {
        backgroundColor: v('colors.paperBackground'),
        height: v('sizes.paperHeight'),
        display: 'grid',
        outline: v('borderStyles.normal'),
        boxShadow: `0 0px 30px -10px ${v('colors.text')}`,
        "media": {
            [m('media print')]: {
                outline: 'none'
            }
        },
    },
    variants: {
        layout: {
            experience: {
                gridTemplate: `
                "...... ...... ...... ...    ...... ......" ${v('sizes.buffery')}
                "...... header header header header buffest" auto
                "buffer side   midL   midR    content buffest" 1fr
                "...... ...... ...... ...    ....... ......" ${v('sizes.buffery')} /
                ${v('sizes.bufferx')} 1fr ${v('sizes.bufferxHalf')} ${v('sizes.bufferxHalf')} 2fr ${v('sizes.bufferx')} 
                `,
                "&:before": {
                    content: "''",
                    display: 'block',
                    backgroundColor: v('colors.sidebar'),
                    gridArea: 'buffer/buffer/midL/midL'
                },
            },
            portfolio: {
                gridTemplate: `
                    "...... ...... ...... ...    ...... ......" ${v('sizes.buffery')}
                    "...... header header header header buffest" auto
                    "buffer content   midL   midR  side buffest" 1fr
                    "...... ...... ...... ...    ....... ......" ${v('sizes.buffery')} /
                    ${v('sizes.bufferx')} 2fr ${v('sizes.bufferxHalf')} ${v('sizes.bufferxHalf')} 1fr ${v('sizes.bufferx')} 
                    `,
                "&:before": {
                    content: "''",
                    display: 'block',
                    backgroundColor: v('colors.sidebar'),
                    gridArea: 'midR/midR/buffest/buffest'
                },
            }
        }
    }
}, { name: 'page' })

export const tripleByteCSS = css({
    base: {
        display: 'grid',
        paddingBlockEnd:v('sizes.inSectionPadding'),
        gridTemplate: `
        "rank level level level level level " auto 
        "rank b1    b2    b3    b4    b5  " ${v('fontSizes.text')} /
        8ch 40fr 30fr 15fr 10fr 5fr`,
        gap:v('sizes.inArticleGap'),
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
            paddingInline:v('sizes.inArticleGap'),
            alignContent: "center",
            justifyContent: "center",
            display: "grid",
        }
    },
    variants: {
        level: {
            3: {
                "--color": v('colors.level3'),
                "--color1": v('colors.level3'),
                "--color2": v('colors.level3'),
                "--color3": v('colors.level3'),
                "--color4": "transparent",
                "--color5": "transparent",
            },
            4: {
                "--color": v('colors.level4'),
                "--color1": v('colors.level4'),
                "--color2": v('colors.level4'),
                "--color3": v('colors.level4'),
                "--color4": v('colors.level4'),
                "--color5": "transparent",
            },
            5: {
                "--color": v('colors.level5'),
                "--color1": v('colors.level5'),
                "--color2": v('colors.level5'),
                "--color3": v('colors.level5'),
                "--color4": v('colors.level5'),
                "--color5": v('colors.level5'),
            }
        }
    }

}, { name: "triplebyte" })

export const headerCSS = css({
    base: {
        color: v('colors.title'),
        gridArea: 'header',
        paddingBlock: v('sizes.paddingTitleY'),
        textAlign: 'center',
        borderBottom: v('borderStyles.normal')
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
                paddingBlockEnd: v('sizes.inSectionPadding'),
                gap: v('sizes.inArticleGap'),
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
                paddingBlockEnd: v('sizes.inSectionPadding'),
                gap: v('sizes.inArticleGap'),
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
            borderBottom: v('borderStyles.normal')
        },
        "& > section": {
            paddingBlock: v('sizes.inSectionPadding')
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