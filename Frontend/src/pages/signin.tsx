import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";

export function Signin(){
    return (
        <div className="bg-slate-400  h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-2xl text-center w-80 h-max px-4">
                    <Heading label={"Sign In"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <InputBox label={"Email"} placeholder={"tripurari@gmail.com"} />
                    <InputBox label={"password"} placeholder={"1234567"} />
                    <div className="pt-4 pb-4">
                        <Button label={"Sign In"} />
                    </div>
                    <BottomWarning label={"Don't Have An Account"} buttonText={"Sign Up"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}