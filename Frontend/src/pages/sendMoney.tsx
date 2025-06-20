import { Button2 } from "../components/Button";
import { InputBox } from "../components/inputBox";

export function SendMoney(){
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
                               A
                           </div>
                        </div>
                        <div className="m-2 text-xl font-bold">
                            Friend's Name
                        </div>
                    </div>
                    <div className="mb-2">
                        <InputBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} />
                    </div>
                    <div className="mt-2">
                        <Button2 label={"Initiate Transfer"} />
                    </div>
                </div>
            </div>
        </div>
    )
}