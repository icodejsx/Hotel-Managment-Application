"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.option = exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    userName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.string()
        .valid(joi_1.default.ref("password"))
        .required()
        .label("confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
    phoneNumber: joi_1.default.string().required(),
    profilePicture: joi_1.default.string().required(),
});
exports.option = {
    abortearly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.LoginSchema = joi_1.default.object({
    userName: joi_1.default.string().required(),
    password: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
