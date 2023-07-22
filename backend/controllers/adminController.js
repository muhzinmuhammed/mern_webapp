import asyncHandler from "express-async-handler"
import { notfound } from "../middleware/errorMiddleware.js"
import fs from 'fs'


import generateToken from "../utils/genarateToken.js"

import User from "../models/userModel.js"

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

const adminLogin = asyncHandler(async (req, res) => {
    const email='admin123@gmail.com'
    const password='123'
  const name='admin'
    

  
   
  
    if (email&&password) {
        let token=   generateToken(password);
      
  
      res.json({
       
        name,
        email,
     
        token
      });
    
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });


  

  const adminView = asyncHandler(async (req, res) => {
    try {
     
      const user = await User.find().exec();
      
      
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  const userDelete = asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      
      const result = await User.deleteOne({ _id: id }); // Pass the filter object {_id: id}
  
      if (result.deletedCount > 0) {
        // Check if user was found and removed
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message }); // Send error response with status code 500
    }
  });
  
 const searchAdminUser = (req, res) => {
    const query = req.query.name // Get the search query from the URL query parameters
  
    // Perform the search using Mongoose
    User
      .find({ name: { $regex: new RegExp(query, 'i') } })
      .then((user_data) => {
        res.status(200).json(user_data)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Internal Server Error')
      })
  }
  

  
  

export {adminView,adminLogin,registerUser,userDelete,searchAdminUser}