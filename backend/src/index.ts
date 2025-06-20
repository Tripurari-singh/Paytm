import express from "express";
import cors from "cors";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { AccountModel,  UserModel } from "./db";
import { JWT_SECRET } from "./config";
import userMiddleware from "./middleware";
import mongoose from "mongoose";


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
    await AccountModel.create({
        userId : userId,
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
        password : z.string()
       
    })

    const {username , password} = signinSchema.parse(req.body);

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
    const account = await AccountModel.findOne({
        //@ts-ignore
        userId : req.userId
    })

    res.json({
        balance : account?.balance
    })
})

// ( Bad Solution )
// ( Does Not Use Transactions For Transsfer Money )
// ( Hence Commented )
// ( If Both Node.js and DataBase Never Go Down It will work Fine  Else It ahs a Problem)
// app.post("/api/v1/Account/transfer" , userMiddleware , async (req , res) => {
//     const {amount , to} = req.body;

//     const account = await AccountModel.findOne({
//         //@ts-ignore
//         userId : req.userId
//     })

//     if(!account){
//          res.status(400).json({
//             message : " Sender Account Invalid "
//         })
//         return
//     }

//     if(account.balance < amount){
//         res.status(400).json({
//             mnessage : "Insufficient Balance In The Account"
//         })
//         return
//     }

//     const toAccount = await AccountModel.findOne({
//         userId : to
//     })

//     if(!toAccount){
//         res.status(400).json({
//             message : " Reciver Account Invalid"
//         })
//     }
   
//     //Debit The Amount From The Senders Account
//     await AccountModel.updateOne({
//         //@ts-ignore
//         userId : req.userId
//     } , {
//        $inc :{
//         balance : -amount
//        }
//     })

    
//     // Credit The Amount To The Recievers Account
//     await AccountModel.updateOne({
//         userId : to
//     } , {
//         $inc : {
//             balance : amount
//         }
//     })


//     res.status(200).json({
//         message : "Transfer Successfull"
//     })
// })

// ( Good Solution )
// Use Transactions For Money Transfer
// Also Address The Issue Of Concurrent Requests Send at Same Time


//( Working Fine Checked )

app.post("/api/v1/Account/transfer" , userMiddleware , async (req , res) => {
    try{
    const session = await mongoose.startSession();
    
    session.startTransaction();
    const {amount , to} = req.body;

    const account = await AccountModel.findOne({
        //@ts-ignore
        userId : req.userId
    }).session(session)

    if(!account){
        await session.abortTransaction();
        res.status(400).json({
            message : "Senders Account Invalid"
        })
        return
    }
    const toAccount = await AccountModel.findOne({
        userId : to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message : "Recievers Account Invalid"
        })
        return
    }
    if(account.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message :"Insufficient Balance In Senders Account"
        })
        return
    }
    //Transfeing Amount
    //Debiting The Amount
    await AccountModel.updateOne({
        //@ts-ignore
        userId : req.userId
    } , {
        $inc : {
            balance : -amount
        }
    }).session(session)

    //Cediting The Amount
    await AccountModel.updateOne({
        //@ts-ignore
        userId : to
    } , {
        $inc : {
            balance : amount
        }
    }).session(session) 

    //Commit The Transaction
    await session.commitTransaction();
    res.json({
        message : " Transfer SuccessFull"
    })
    }catch(error){
        res.status(500).json({
            message : "Internnal Server Error ",
            error : error
        })
    }
    
});


app.listen(3000 , () => {
    console.log("app is Listening on Port 3000")
})



