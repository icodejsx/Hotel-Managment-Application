import mongoose from "mongoose";


interface AdminType {
  [key: string]: string | boolean | Array<string>;
}


const adminSchema = new mongoose.Schema(
  { 
    firstName: {type: String}, 
    lastName: { type: String }, 
    userName: {type: String}, 
    email: {type: String}, 
    password: { type: String },  
    phoneNumber: {type: String}, 
    profilePhoto:  {type: String}, 
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model<AdminType>('Admin', adminSchema)

export = Admin; 