"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
/* GET users listing. */
router.post('/register_admin', adminController_1.RegisterAdmin);
router.post('/login_admin', adminController_1.AdminLogin);
router.post('/update_admin', adminController_1.UpdateAdminProfile);
exports.default = router;
