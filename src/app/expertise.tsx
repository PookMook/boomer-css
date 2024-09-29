import { css, v } from '@/libs/boomer' with {type: 'macro'}

const tripleByteCSS = css({
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



export function Expertise(props:{level:3 | 4 | 5}){
    const levels = {
        3: "PROFICIENT",
        4: "ADVANCED",
        5: "EXPERT"
    }
    return <div className={tripleByteCSS({level:props.level})}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <p>level {props.level}</p>
        <p>{levels[props.level]}</p>
    </div>

}