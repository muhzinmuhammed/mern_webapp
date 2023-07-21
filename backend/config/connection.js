import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected");
})
.catch((err)=>{

    console.log(err);

})

} 

export  {connectDB}