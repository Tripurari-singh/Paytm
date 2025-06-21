interface LabelInterface {
    label : string
}
export function Heading({label} : LabelInterface){
    return (
        <div className="font-bold text-4xl pt-6 text-slate-600">
            {label}
        </div>
    )
}