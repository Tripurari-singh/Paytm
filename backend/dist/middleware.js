"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(403).json({
            message: "Invalid Token Or Missing token"
        });
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        console.log("userId from Token", decoded.userId);
        //  @ts-ignore
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid Error / Verification Failed"
        });
    }
};
exports.default = userMiddleware;
