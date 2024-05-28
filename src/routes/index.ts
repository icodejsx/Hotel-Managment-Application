// import express from 'express';
import  express,{Request, Response, NextFunction} from 'express';

const  router = express.Router();

/* GET home page. */
router.get('/', async function (req, res:Response, next) {
  res.render('index', { title: 'Express' });
});

export default router;
