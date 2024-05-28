import  express,{Request, Response, NextFunction} from 'express';
import { RegisterAdmin } from '../controllers/adminController';
const router = express.Router();

/* GET users listing. */
router.post('/register_admin', RegisterAdmin);

export default router;
