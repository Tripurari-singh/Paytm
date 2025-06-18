import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";
import jwt, { decode } from "jsonwebtoken";


const userMiddleaare = (req : Request , res : Response , next : NextFunction) => {

   const authHeader = req.headers.authorization;

   if(!authHeader || !authHeader.startsWith("Bearer ")){
    res.status(403).json({
        message : "Invalid Token Or Missing token"
    })
    return
   }

  try{
     const token = authHeader.split("")[1];

     const decoded = jwt.verify(token , JWT_SECRET) as any;

     console.log("userId from Token" , decoded.userId)

     req.userId = decoded.userId;
   
     next(); 

  }catch(error){
    res.status(403).json({
        message : "Invalid Error / Verification Failed"
    })
  }
}

export default userMiddleaare;
