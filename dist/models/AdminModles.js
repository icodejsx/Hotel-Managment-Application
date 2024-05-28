"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    profilePhoto: { type: String },
}, {
    timestamps: true,
});
const Admin = mongoose_1.default.model('Admin', adminSchema);
module.exports = Admin;
