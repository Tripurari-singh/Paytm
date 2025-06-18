import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { AmountModel, UserModel } from "./db";
import { JWT_SECRET } from "./config";
import userMiddleware from "./middleware";


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


    //Random Account Creation
    await AmountModel.create({
        balance : 1 + Math.random() * 10000
    })
    ///.......................



    const token = jwt.sign({
        userId : user._id
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
        const token = jwt.sign({userId : user._id} , JWT_SECRET);
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

app.put("/api/v1/user/update" , userMiddleware ,async (req , res) => {
    const updateSchema = z.object({
        password : z.string().optional(),
        FirstName : z.string().optional(),
        LastName : z.string().optional(),
    })

    const { password , FirstName , LastName} = updateSchema.parse(req.body);

    const updateData : any = {};

    try{
        if(password){
        const HashedPassword = await bcrypt.hash(password , 10);
        updateData.password = HashedPassword;
    }
    if(FirstName){ updateData.FirstName = FirstName }
    if(LastName){ updateData.LastName = LastName }

     const updatedData = await UserModel.findOneAndUpdate(
        //@ts-ignore
        {_id : req.userId},
        updateData,
        {new : true}
    )

    if(!updatedData){
         res.status(404).json({
            message : "user not Found . "
        })
        return;
    }

    res.json({
        message :"Updatd Successfully"
    })
    }catch(error){
        if(error instanceof ZodError){
             res.status(404).json({
                message : " Invalid Details / Zod Error",
                error : error.errors,
                
            })
        }
        res.status(500).json({
            message : " Invalid Server Error"
        })
    }
})
app.get("/api/v1/user/bulk" , userMiddleware ,async (req , res) => {
    const filter = req.query.filter || "";

    const users = await UserModel.find({
        $or : [{
            FirstName : {
                "$regex" : filter
            }
        } , {
            LastName : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user : users.map(user => ({
            username : user.username,
            FirstName : user.FirstName,
            LastName : user.LastName,
            id : user._id
        }))
    })
})

app.get("/api/v1/Account/balance" , userMiddleware ,async (req , res) => {
    const account = await AmountModel.findOne({
        //@ts-ignore
        userId : req.userId
    })

    res.json({
        balance : account?.balance
    })
})

app.post("/api/v1/Account/transfer" , userMiddleware , async (req , res) => {
    
})

app.listen(3000 , () => {
    console.log("app is Listening on Port 3000")
})


dotenv.config();

