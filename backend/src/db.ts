import mongoose, { model, Schema } from "mongoose";

mongoose.connect("")

const userSchema = new Schema({
    username : String,
    password : String,
    FirstName : String,
    LastName : String,
})

export const UserModel =  model("user" , userSchema)    