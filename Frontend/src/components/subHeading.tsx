interface subHeadingInterface {
    label : string
}
export function SubHeading({label} : subHeadingInterface){
    return (
        <div className="text-slate-500 text-md pt-2 px-4 pb-4">
            {label}
        </div>
    )
}