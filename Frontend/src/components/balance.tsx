import axios from "axios";
import { useState } from "react"


export function Balance(){
    const [balance , setBalance] = useState(0);
    const token = localStorage.getItem("token")
    axios.get("http://localhost:3000/api/v1/Account/balance" , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then((response) => {
        setBalance(response.data.balance)
    })
    return (
        <div className="flex shadow-slate-400 bg-white shadow-md hover:shadow-2xl transition-all duration-300 m-6 p-6 rounded-2xl border border-gray-200">
            <div className="text-bold text-2xl p-3">
                 Your Balance :
            </div>
            <div className="text-bold text-2xl p-3">
                {balance}
            </div>
        </div>
    )
}
