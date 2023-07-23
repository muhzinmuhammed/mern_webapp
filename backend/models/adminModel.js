import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
      
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      
    },
    {
      timestamps: true,
    }
  );


  
  


  // Encrypt password using bcrypt

const admin=mongoose.model('admins',adminSchema)
export default admin  