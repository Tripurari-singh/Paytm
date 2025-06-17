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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
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
        const token = jsonwebtoken_1.default.sign({
            userId
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
            password: zod_1.z.string(),
            FirstName: zod_1.z.string(),
            LastName: zod_1.z.string(),
        });
        const { username, password, LastName, FirstName } = signinSchema.parse(req.body);
        const user = yield db_1.UserModel.findOne({ username });
        const userId = user === null || user === void 0 ? void 0 : user._id;
        if (user) {
            const token = jsonwebtoken_1.default.sign({ userId }, config_1.JWT_SECRET);
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
app.listen(3000, () => {
    console.log("app is Listening on Port 3000");
});
dotenv_1.default.config();
