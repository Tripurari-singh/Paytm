import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { UserModel } from "./db";
import { JWT_SECRET } from "./config";


const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/user/signup" ,async (req , res) => {
    try{
        const signupSchema = z.object({
        username : z.string(),
        password : z.string(),
        FirstName : z.string(),
        LastName : z.string(),
    })

    const { username , password , FirstName , LastName} = signupSchema.parse(req.body);

    const userExist = await UserModel.findOne({username});

    if(userExist){
        res.json({
            message : "User Already Exist"
        })
        return
    }

    const HashedPassword = await bcrypt.hash(password , 10);

    const user = await UserModel.create({
        username : username,
        password : HashedPassword,
        FirstName : FirstName,
        LastName : LastName
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    } , JWT_SECRET)

    res.json({
        message : "User Added SuccessFully",
        token : token
    })
    }catch(error){
        if(error instanceof ZodError){
            res.status(404).json({
                message : "Invalid InputData",
                error : error.errors
            })
        }
        res.json({
            message : "Intenal server Error"
        })
    }
})
app.post("/api/v1/user/signin" , async (req , res) => {
    try{
        const signinSchema = z.object({
        username : z.string(),
        password : z.string(),
        FirstName : z.string(),
        LastName : z.string(),
    })

    const {username , password , LastName , FirstName} = signinSchema.parse(req.body);

    const user = await UserModel.findOne({username});

    const userId = user?._id

    if(user){
        const token = jwt.sign({userId} , JWT_SECRET);
        res.json({
            messaage : "SignIned SuccessFully",
            token : token
        })
    }
    }catch(error){
        if(error instanceof ZodError){
            res.status(404).json({
                message : "Invalid InputData",
                error : error.errors
            })
        }
        res.json({
            message : "Intenal server Error"
        })
    }


})

app.listen(3000 , () => {
    console.log("app is Listening on Port 3000")
})


dotenv.config();

