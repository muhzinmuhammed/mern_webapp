import asyncHandler from "express-async-handler"
import { notfound } from "../middleware/errorMiddleware.js"
import fs from 'fs'


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
        image:user.image,
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
        image:user.image,
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
  
  let new_image = "";
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("./uploads/" + req.body.image); // Delete the old image file
    } catch (error) {
      console.log(error);
    }
  } else {
    new_image = req.body.image;
  }

 

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image=new_image||user.image

    if (req.body.password) {
      user.password = req.body.password;
    }

    // Check if a new photo is uploaded
    if (req.file) {
      // Assuming your User model has a field named "photo"
      user.photo = req.file.path; // Update the photo field with the file path
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo, // You can include the photo field in the response
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

  

  const adminView = asyncHandler(async (req, res) => {
    try {
     
      const user = await User.find().exec();
      console.log(user,"kk");
      
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  
  

export {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile,adminView}