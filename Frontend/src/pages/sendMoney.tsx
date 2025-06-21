import { useSearchParams } from "react-router-dom";
import { Button2 } from "../components/Button";
import { InputBox } from "../components/inputBox";
import axios from "axios";
import { useState } from "react";

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const id  = searchParams.get("id");
    const name : string | null = searchParams.get("name");
    const token = localStorage.getItem("token")

   const [amount , setAmount] = useState(0);

    return(
        <div className="flex justify-center bg-slate-200 h-screen">
            <div className="flex flex-col justify-center h-full">
                <div className=" m-10 p-10 flex flex-col justify-center border-slate-400 w-full h-max text-card-foreground max-w-md bg-white shadow-lg rounded-2xl">
                    <div className="flex flex-col justify-center p-6 m-6 font-bold text-3xl ml-15">
                        <h2> Send Money </h2>
                    </div>
                    
                    <div className="flex">
                        <div className=" flex flex-col justify-center bg-green-500 rounded-full h-12 w-12">
                           <div className="flex flex-col justify-center rounded-full m-2 p-2 text-xl text-white">
                               {name?.[0]}
                           </div>
                        </div>
                        <div className="m-2  ml-3 text-2xl font-bold">
                           {name}
                        </div>
                    </div>
                    <div className="mb-2">
                        <InputBox onChange={(e) => {
                            setAmount(Number(e.target.value))
                        }} label={"Amount (in Rs)"} placeholder={"Enter Amount"} />
                    </div>
                    <div className="mt-2">
                        <Button2 onClick={() => {
                            axios.post("http://localhost:3000/api/v1/Account/transfer" , {
                                to : id,
                                amount : amount
                            } , {
                                headers : {
                                    Authorization : `Bearer ${token}`
                                }
                            })
                        }}  label={"Initiate Transfer"} />
                    </div>

                </div>
            </div>
        </div>
    )
}