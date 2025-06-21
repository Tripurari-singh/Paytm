interface ButtonInterface {
    label : string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export function Button({label , onClick} : ButtonInterface){
    return(
        <div>
           <button onClick={onClick} type="button" className="text-white w-full bg-slate-500 hover:bg-gray-900 focus:outline-none  focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-2.5 me-2 mb-2">{label}</button>
        </div>
    )
}
