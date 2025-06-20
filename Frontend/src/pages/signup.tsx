import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";

export function Signup(){
    return (
        <div className="bg-slate-400 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className=" bg-white w-80 text-center rounded-2xl p-2 h-max px-4">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your infromation to create an account"}/>
                    <InputBox placeholder={"Tripurari"} label={"FirstName"}/>
                    <InputBox placeholder={"singh"} label={"LastName"}/>
                    <InputBox placeholder={"tripurari@gmail.com"} label={"Email/Username"}/>
                    <InputBox placeholder={"1234567"} label={"password"}/>
                    <div className="pt-5">
                        <Button label={"Sign Up"}/>
                    </div>
                    
                    <BottomWarning label={"Don't Have An Account"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}