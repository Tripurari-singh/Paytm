import { useEffect, useState } from "react"
import { InputBox } from "./inputBox";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface userInterface {
    user : {
        FirstName : string,
        LastName  : string,
        id : string
    }
}

export function Users(){

    const[users , setUsers] = useState([]);
    const [filter , setFilter] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter , {
            headers : {
               Authorization : `Bearer ${token}`
            }
        })
        .then((response) => {
            setUsers(response.data.user)
        })
    } , [filter])

    return (
        <div className="flex flex-col justify-between shadow-slate-400 bg-white shadow-md hover:shadow-2xl transition-all duration-300 m-6 p-6 rounded-2xl border border-gray-200">
            <div className=" text-2xl font-bold  ml-12 m-2 ">
                Users
            </div>
            <div className="ml-10 mr-10">
                <InputBox onChange={(e) => {
                    setFilter(e.target.value)
                }} placeholder={"Search Users"} />
            </div>
            <div>
                {users.map(user => <User user={user} />)}
            </div>
        </div>
    )
}

 export function User({user} : userInterface){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between ml-10 mt-5">
            <div className="flex">
                <div className=" flex flex-col justify-center bg-slate-500 rounded-full h-11 w-11">
                    <div className=" text-white flex flex-col justify-center rounded-full m-2 p-2 text-xl">
                       {user.FirstName[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col justify-centerm-2 p-2 text-xl">
                    {user.FirstName}{user.LastName}
                </div>
            </div>
            <div className="ml-10 mr-10">
                <Button onClick={() => {
                    navigate(`/sendmoney?id=${user.id}&name=${encodeURIComponent(user.FirstName)}`)
                }} label={"Send Money"} />
            </div>
        </div>
    )
}

