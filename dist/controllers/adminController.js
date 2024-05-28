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
exports.RegisterAdmin = void 0;
const utils_1 = require("../utils/utils");
const adminModles_1 = __importDefault(require("../models/adminModles"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtsecret = process.env.JWT_SECRET;
const RegisterAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;
        const phoneNumber = req.body.phoneNumber;
        const profilePhoto = req.body.profilePhoto;
        // validating Admin details
        const validateAdmin = utils_1.RegisterSchema.validate(req.body, utils_1.option);
        if (validateAdmin.error) {
            res.status(400).json({ Error: validateAdmin.error.details[0].message });
        }
        //  Hashing password
        const passwordHash = yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(12));
        // finding the the admin exist? or not 
        const admin = yield adminModles_1.default.findOne({ userName: userName });
        // if admin dose not exist register admin
        if (!admin) {
            const newAdmin = yield adminModles_1.default.create({
                firstName,
                lastName,
                userName,
                email,
                password: passwordHash,
                confirm_password,
                phoneNumber,
                profilePhoto,
            });
            return res.status(200).json({
                message: " Admin Registration Successful",
                data: newAdmin,
            });
        }
        // if admin exist 
        res.status(400).json({
            message: "Admin already exixt",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.RegisterAdmin = RegisterAdmin;
