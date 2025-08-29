import mongoose, { model, Schema } from "mongoose";

mongoose.connect("")


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
