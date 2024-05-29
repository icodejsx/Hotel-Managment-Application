import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import Admin from "../models/adminModles";

// Define the custom property 'admin' on the Request object
declare global {
  namespace Express {
    interface Request {
      admin?: any;
    }
  }
}




const jwtsecret = process.env.JWT_SECRET as string;

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
         const authorization = req.headers.authorization;
        
        
    if (!authorization) {
      return res.status(401).json({ message: "Kindly sign in as a Hotel Admin" });
        }
        

    const token = authorization.slice(7, authorization.length);
        let verify = jwt.verify(token, jwtsecret);
        

     if (!verify) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

          const { _id } = verify as { [key: string]: string };

        const admin = await Admin.findById(_id);
        
          if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
      });
        }
         // Assign the verified token to the 'admin' property of the Request object

   req.admin = verify;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;