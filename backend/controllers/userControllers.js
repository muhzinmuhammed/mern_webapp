import asyncHandler from "express-async-handler"
import { notfound } from "../middleware/errorMiddleware.js"
import jwt from 'jsonwebtoken'

import generateToken from "../utils/genarateToken.js"

import User from "../models/userModel.js"

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });

  
   
  
    if (user && (await user.matchPassword(password))) {
        let token=   generateToken( user._id);
      
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });
    
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
const registerUser=asyncHandler (async(req,res)=>{
    const {name,email,password}=req.body
   const useExits=await User.findOne({email})
   if (useExits) {
     res.status(400)
    throw new Error ('User alredy exits')
    
   }

   const user =await User.create({
    name,
    email,
    password
   })
   if (user) {
 let token=   generateToken( user._id);

    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token
    })
    
   }else{
    res.status(400)
    throw new Error ('invalid user data')   

   }
    
   

})
const logoutUser = asyncHandler(async (req, res) => {
    
  
    res.status(200).json({ message: 'Logged out successfully' });
  });
  
const getUserProfile=asyncHandler (async(req,res)=>{
  const user = await User.findById(req.user._id);
 
    
    res.status(200).json({message:req.user})

})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
  

  const adminView = asyncHandler(async (req, res) => {
    try {
     
      const usss = await User.find().exec();
      
      res.status(200).json(usss);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  
  

export {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile,adminView}