import express from'express'

import { notfound,errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'


import { connectDB } from './config/connection.js'

connectDB()


import dotenv from 'dotenv'

import useRoute from './routes/useRoutes.js'
import adminRoute from './routes/adminRoute.js'
dotenv.config()

const port =process.env.PORT||5000

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users',useRoute)
app.use('/api/admin',adminRoute)
app.use(errorHandler)
app.use(cookieParser())
app.use(notfound)
app.get('/',(req,res)=>{
    res.send('serverstarted') 
})
app.listen(port,()=>console.log(`server started port on ${port}`))
