
interface valueInterface {
    value : number
} 
export function Balance({value} : valueInterface){
    return (
        <div className="flex shadow-slate-400 bg-white shadow-md hover:shadow-2xl transition-all duration-300 m-6 p-6 rounded-2xl border border-gray-200">
            <div className="text-bold text-2xl p-3">
                 Your Balance :
            </div>
            <div  className="text-bold text-2xl p-3">
                {value}
            </div>
        </div>
    )
}
