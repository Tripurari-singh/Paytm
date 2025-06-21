import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [FirstName , setFirstName] = useState("");
    const [LastName , setLastName] = useState("");
    const navigate = useNavigate();
   
    return (
        <div className="bg-slate-400 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className=" bg-white w-80 text-center rounded-2xl p-2 h-max px-4">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your infromation to create an account"}/>
                    <InputBox onChange={(e) => {
                        setFirstName(e.target.value);
                    }} placeholder={"Tripurari"} label={"FirstName"}/>
                    <InputBox onChange={(e) => {
                        setLastName(e.target.value);
                    }} placeholder={"singh"} label={"LastName"}/>
                    <InputBox onChange={(e) => {
                        setUserName(e.target.value);
                    }} placeholder={"tripurari@gmail.com"} label={"Email/Username"}/>
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value);
                    }} placeholder={"1234567"} label={"password"}/>
                    <div className="pt-5">
                        <Button onClick={ () => {
                             axios.post("http://localhost:3000/api/v1/user/signup" , {
                                username : userName, 
                                password,
                                FirstName,
                                LastName, 
                            }).then((response) => {
                                localStorage.setItem("token" , response.data.token) 
                                 navigate("/dashboard")
                            })
                        }} label={"Sign Up"}/>
                    </div>
                    
                    <BottomWarning label={"Already Have An Account"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}