interface InputBoxInterface {
    label? : string,
    placeholder : string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export function InputBox({label , placeholder ,onChange} : InputBoxInterface){
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">{label}</div>
            <input placeholder={placeholder} onChange={onChange} className="w-full px-2 py-2 border rounded-2xl border-slate-500"></input>
        </div>
    )
}