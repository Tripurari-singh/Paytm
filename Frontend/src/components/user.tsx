import { useState } from "react"
import { InputBox } from "./inputBox";
import { Button } from "./Button";

interface userInterface {
    user : {
        FirstName : string,
        LastName  : string,
        _id : number
    }
}

export function Users(){

    const[users , setUsers] = useState([{
        FirstName : "Tripurari",
        LastName  : "Singh",
        _id : 1
    }]);  

    return (
        <div className="flex flex-col justify-between shadow-slate-400 bg-white shadow-md hover:shadow-2xl transition-all duration-300 m-6 p-6 rounded-2xl border border-gray-200">
            <div className=" text-2xl font-bold  ml-12 m-2 ">
                {/* {users} */}
                Users
            </div>
            <div className="ml-10 mr-10">
                <InputBox placeholder={"Search Users"} />
            </div>
            <div>
                {users.map(user => <User user={user} />)}
            </div>
        </div>
    )
}

 export function User({user} : userInterface){
    return(
        <div className="flex justify-between ml-10 mt-5">
            <div className="flex">
                <div className=" flex flex-col justify-center bg-slate-500 rounded-full h-11 w-11">
                    <div className=" text-white flex flex-col justify-center rounded-full m-2 p-2 text-xl">
                       {user.FirstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-centerm-2 p-2 text-xl">
                    {user.FirstName}{user.LastName}
                </div>
            </div>
            <div className="ml-10 mr-10">
                <Button label={"Send Money"} />
            </div>
        </div>
    )
}

"flex justify-between items-center p-4 bg-white rounded-xl shadow-md border border-gray-200 backdrop-blur-sm"