interface ButtonInterface {
    label : string
}
export function Button({label} : ButtonInterface){
    return(
        <div>
           <button type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none  focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{label}</button>
        </div>
    )
}
export function Button2({label} : ButtonInterface){
    return(
        <div>
           <button type="button" className=" w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{label}</button>
        </div>
    )
}
