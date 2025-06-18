import mongoose, { model, Mongoose, Schema } from "mongoose";

mongoose.connect("")

const userSchema = new Schema({
    username : String,
    password : String,
    FirstName : String,
    LastName : String,
});

const amountSchema = new Schema({
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

export const AmountModel = model("amount" , amountSchema);
export const UserModel =  model("user" , userSchema);