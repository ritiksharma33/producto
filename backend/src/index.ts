import express from 'express';
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors';
import path, { dirname } from "path";
import { ENV, } from "./config/env";

import userRoutes from "./routes/userRoutes"
import productRoutes from "./routes/productRoutes"
import commentRoutes from "./routes/commentsRoutes"
const app=express();
//to let frontend access our backend and send cookies for authentication we need to enable cors with credentials and specify the frontend url as origin
app.use(cors({origin:ENV.FRONTEND_URL,credentials:true}))
//we are using clerk middleware to protect our routes and make sure only authenticated users can access them
app.use(clerkMiddleware());





app.use(express.json()) //to parse json body from request
app.use(express.urlencoded({extended:true}))//to parse form data like html
//changed it to /api/health
app.get('/api/health',(req,res)=>{
   res.json({
    "message":"hello world",
    endpoints:{
        users:"/api/users",
        prodcuts:"/api/products",
        comments:"/api/comments",

    },
});
   
})
app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/comments",commentRoutes)
//if we are in production do this 
if(ENV.NODE_ENV==='production'){
    const __dirname=path.resolve();
    //serve staic files from frontend dist/html
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    //these are middleware by node
    //handle single page application  routing send all non api routes to index.html react app
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    });


} 
 
app.listen(ENV.PORT,()=>{
    console.log(`Server is running on port ${ENV.PORT}`);
})