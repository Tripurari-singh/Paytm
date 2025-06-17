import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://Tripurari:cCKXZK7PWcV95k6K@cluster0.c0dgn.mongodb.net/Paytm")

const userSchema = new Schema({
    username : String,
    password : String,
    FirstName : String,
    LastName : String,
})

export const UserModel =  model("user" , userSchema)    