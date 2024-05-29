import  express,{Request, Response, NextFunction} from 'express';
import { AdminLogin, RegisterAdmin } from '../controllers/adminController';
const router = express.Router();

/* GET users listing. */
router.post('/register_admin', RegisterAdmin);
router.post('/login_admin', AdminLogin);


export default router;
