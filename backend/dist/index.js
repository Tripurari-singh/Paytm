"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = __importDefault(require("./middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/v1/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signupSchema = zod_1.z.object({
            username: zod_1.z.string(),
            password: zod_1.z.string(),
            FirstName: zod_1.z.string(),
            LastName: zod_1.z.string(),
        });
        const { username, password, FirstName, LastName } = signupSchema.parse(req.body);
        const userExist = yield db_1.UserModel.findOne({ username });
        if (userExist) {
            res.json({
                message: "User Already Exist"
            });
            return;
        }
        const HashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield db_1.UserModel.create({
            username: username,
            password: HashedPassword,
            FirstName: FirstName,
            LastName: LastName
        });
        const userId = user._id;
        //Random Account Creation
        yield db_1.AccountModel.create({
            userId: userId,
            balance: 1 + Math.random() * 10000
        });
        ///.......................
        const token = jsonwebtoken_1.default.sign({
            userId: user._id
        }, config_1.JWT_SECRET);
        res.json({
            message: "User Added SuccessFully",
            token: token
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(404).json({
                message: "Invalid InputData",
                error: error.errors
            });
        }
        res.json({
            message: "Intenal server Error"
        });
    }
}));
app.post("/api/v1/user/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signinSchema = zod_1.z.object({
            username: zod_1.z.string(),
            password: zod_1.z.string()
        });
        const { username, password } = signinSchema.parse(req.body);
        const user = yield db_1.UserModel.findOne({ username });
        const userId = user === null || user === void 0 ? void 0 : user._id;
        if (user) {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.JWT_SECRET);
            res.json({
                messaage: "SignIned SuccessFully",
                token: token
            });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(404).json({
                message: "Invalid InputData",
                error: error.errors
            });
        }
        res.json({
            message: "Intenal server Error"
        });
    }
}));
app.put("/api/v1/user/update", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateSchema = zod_1.z.object({
        password: zod_1.z.string().optional(),
        FirstName: zod_1.z.string().optional(),
        LastName: zod_1.z.string().optional(),
    });
    const { password, FirstName, LastName } = updateSchema.parse(req.body);
    const updateData = {};
    try {
        if (password) {
            const HashedPassword = yield bcrypt_1.default.hash(password, 10);
            updateData.password = HashedPassword;
        }
        if (FirstName) {
            updateData.FirstName = FirstName;
        }
        if (LastName) {
            updateData.LastName = LastName;
        }
        const updatedData = yield db_1.UserModel.findOneAndUpdate(
        //@ts-ignore
        { _id: req.userId }, updateData, { new: true });
        if (!updatedData) {
            res.status(404).json({
                message: "user not Found . "
            });
            return;
        }
        res.json({
            message: "Updatd Successfully"
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(404).json({
                message: " Invalid Details / Zod Error",
                error: error.errors,
            });
        }
        res.status(500).json({
            message: " Invalid Server Error"
        });
    }
}));
app.get("/api/v1/user/bulk", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "";
    const users = yield db_1.UserModel.find({
        $or: [{
                FirstName: {
                    "$regex": filter
                }
            }, {
                LastName: {
                    "$regex": filter
                }
            }]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            id: user._id
        }))
    });
}));
app.get("/api/v1/Account/balance", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield db_1.AccountModel.findOne({
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        balance: account === null || account === void 0 ? void 0 : account.balance
    });
}));
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
app.post("/api/v1/Account/transfer", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const { amount, to } = req.body;
        const account = yield db_1.AccountModel.findOne({
            //@ts-ignore
            userId: req.userId
        }).session(session);
        if (!account) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Senders Account Invalid"
            });
            return;
        }
        const toAccount = yield db_1.AccountModel.findOne({
            userId: to
        }).session(session);
        if (!toAccount) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Recievers Account Invalid"
            });
            return;
        }
        if (account.balance < amount) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Insufficient Balance In Senders Account"
            });
            return;
        }
        //Transfeing Amount
        //Debiting The Amount
        yield db_1.AccountModel.updateOne({
            //@ts-ignore
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session);
        //Cediting The Amount
        yield db_1.AccountModel.updateOne({
            //@ts-ignore
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        }).session(session);
        //Commit The Transaction
        yield session.commitTransaction();
        res.json({
            message: " Transfer SuccessFull"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internnal Server Error ",
            error: error
        });
    }
}));
app.listen(3000, () => {
    console.log("app is Listening on Port 3000");
});
