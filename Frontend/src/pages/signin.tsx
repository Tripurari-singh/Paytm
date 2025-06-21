import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){

    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="bg-slate-400  h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-2xl text-center w-80 h-max px-4">
                    <Heading label={"Sign In"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <InputBox onChange={(e) => {
                        setUserName(e.target.value)
                    }} label={"Email"} placeholder={"tripurari@gmail.com"} />
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} label={"password"} placeholder={"1234567"} />
                    <div className="pt-4 pb-4">
                        <Button onClick={() => {
                            axios.post("http://localhost:3000/api/v1/user/signin" , {
                                username : userName,
                                password
                            }).then((response) => {
                                localStorage.setItem("token" , response.data.token)
                                 navigate("/dashboard")
                            }).catch((err) => {
                                alert("Signin failed. Please check your credentials.");
                                console.error(err);
                            });
                        }} label={"Sign In"} />
                    </div>
                    <BottomWarning label={"Don't Have An Account"} buttonText={"Sign Up"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}