import { tripleByteCSS } from "@/css/config"

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