import express from 'express';
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors';
import { ENV } from "./config/env";


const app=express();
app.use(cors({origin:ENV.FRONTEND_URL}))
//we are using clerk middleware to protect our routes and make sure only authenticated users can access them
app.use(clerkMiddleware())
app.use(express.json()) //to parse json body from request
app.use(express.urlencoded({extended:true}))//to parse form data like html
app.get('/',(req,res)=>{
   res.json({
    "message":"hello world",
    endpoints:{
        users:"/api/users",
        prodcuts:"/api/products",
        comments:"/api/comments",

    },
});
   
})

app.listen(ENV.PORT,()=>{
    console.log(`Server is running on port ${ENV.PORT}`);
})