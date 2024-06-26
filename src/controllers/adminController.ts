import { Request, Response } from 'express';
import { LoginSchema, RegisterSchema,option } from '../utils/utils';
import Admin from '../models/adminModles';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { options } from 'joi';

const jwtsecret = process.env.JWT_SECRET as string;


//  Register Admin  controllers
export const RegisterAdmin = async (req: Request, res: Response) => {
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
        const validateAdmin = RegisterSchema.validate(req.body, option)
        if (validateAdmin.error) {
        res.status(400).json({ Error: validateAdmin.error.details[0].message });
      }
      
        //  Hashing password
      const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(12));
      

        // finding the the admin exist? or not 
        const admin = await Admin.findOne({ userName: userName });

        // if admin dose not exist register admin
        if (!admin) {
            const newAdmin = await Admin.create({
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


     } catch (error) {
    console.log(error);
  }

}


// Admin login  controller
export const AdminLogin = async (req: Request, res: Response) => {

  try {

    const userName = req.body.userName;
    const password = req.body.password; 
  
    //validate Admin
    
    const validateAdmin = LoginSchema.validate(req.body, option) 
    
  
    if (validateAdmin.error) {
          res.status(400).json({ Error: validateAdmin.error.details[0].message });
    }

    // Verify if Admin Exists 
    const admin = (await Admin.findOne({
     userName: userName,
    })) as unknown as { [key: string]: string };


    // verify If Admin Dose not Exists
      if (!Admin) {
      return res.status(400).json({
        error: "Amin not found",
      });
    }

// destructing admin to get id of admin 
    const { _id } = admin;

    //generate token
    const token = jwt.sign({ _id }, jwtsecret, { expiresIn: "30d" });

    //compare  Admin password
    
    const validAdmin = await bcrypt.compare(password, admin.password)
    
    if (validAdmin) {
         return res.status(200).json({
        msg: " Admin Login Successful",
        admin,
        token,
      });
    }
       return res.status(400).json({
      error: "Invalid password",
    });

  } catch (error) {
    console.error("Something went wrong durring Admin login in");
  }

}



// updating admin profile controllers 
export const UpdateAdminProfile = async (req: Request, res: Response) => {
 try {
    const { firstName, lastName, email, userName, password, phoneNumber, profilePhoto } = req.body;

    // Find the admin by username
    const admin = await Admin.findOne({ userName });

    // If admin does not exist, return an error
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
   // Update admin profile fields
   if (firstName) admin.firstName = firstName;
    if (lastName) admin.lastName = lastName;
    if (email) admin.email = email;
    if (phoneNumber) admin.phoneNumber = phoneNumber;
    if (profilePhoto) admin.profilePhoto = profilePhoto;

    // If password is provided, hash and update it
    if (password) {
      const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(12));
      admin.password = passwordHash;
    }

    // Save the updated admin profile
    await admin.save();

    // Generate JWT token
    const token = jwt.sign({ _id: admin._id }, jwtsecret, { expiresIn: '30d' });

    res.status(200).json({
      message: 'Admin profile updated successfully',
      admin,
      token,
    });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};