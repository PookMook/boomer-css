export function TimeRange(props:{start:string, end:string, short?: boolean}){
    const end = (props.end === "now" ? new Date() : new Date(props.end))
    return <p>
        <time dateTime={props.start}>
                {new Date(props.start).toLocaleDateString('en',{
                    month: props.short? undefined: 'short',
                    year: 'numeric'
                })}
        </time> – 
        <time dateTime={end.toDateString()}> {
            props.end === "now" ? 'present' : 
            end.toLocaleDateString('en',{
                month: props.short? undefined: 'short',
                year: 'numeric'
            })
        }
        </time>
    </p>

}