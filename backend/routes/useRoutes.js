import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  adminView
} from '../controllers/userControllers.js';
import  {protect}  from '../middleware/authMiddleware.js';

import { upload } from '../middleware/multerMiddleweare.js';
const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile',protect, getUserProfile)
router.post('/profile', protect,upload, updateUserProfile);


  
  
 

 

export default router;