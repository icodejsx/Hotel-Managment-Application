import  express,{Request, Response, NextFunction} from 'express';
import { AdminLogin, RegisterAdmin, UpdateAdminProfile } from '../controllers/adminController';
const router = express.Router();

/* GET users listing. */
router.post('/register_admin', RegisterAdmin);
router.post('/login_admin', AdminLogin);
router.post('/update_admin', UpdateAdminProfile);



export default router;
