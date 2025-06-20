import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://Tripurari:cCKXZK7PWcV95k6K@cluster0.c0dgn.mongodb.net/Paytm")


const userSchema = new Schema({
    username : String,
    password : String,
    FirstName : String,
    LastName : String,
});

const accountSchema = new Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : "user"
    },
    balance : {
        type : Number,
        required : true
    }
});

export const AccountModel = model("amount" , accountSchema);
export const UserModel =  model("user" , userSchema);