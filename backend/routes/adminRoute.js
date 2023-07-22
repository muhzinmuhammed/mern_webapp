import expres from 'express'
const adminRoute=expres.Router()
import { adminView,adminLogin,registerUser,userDelete,searchAdminUser } from '../controllers/adminController.js'
adminRoute.get('/userstable',adminView)
adminRoute.post('/admin_login',adminLogin)
adminRoute.post('/user_create',registerUser)
adminRoute.delete('/delete_user/:id',userDelete)
adminRoute.get('/user_searcch/:id',searchAdminUser)

export default adminRoute