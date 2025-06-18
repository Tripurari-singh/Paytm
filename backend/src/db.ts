import mongoose, { model, Mongoose, Schema } from "mongoose";

mongoose.connect("")

const userSchema = new Schema({
    username : String,
    password : String,
    FirstName : String,
    LastName : String,
})

const amountSchema = new Schema({
    userId : {
        type : Mongoose.Schema.type.objectId
    }
})

export const UserModel =  model("user" , userSchema)    