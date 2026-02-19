import type {Request,Response} from "express";
import * as queries from "../db/querries";
import {getAuth } from "@clerk/express";


//create comment private
export const createComment= async (req:Request,res:Response)=>{
    try{
 const {userId}=getAuth(req);
 if(!userId){
    return res.status(401).json({error:"Unauthorized"});
 }
 //here we separted two of the entities product id and content because they are in the request body and we need to get them separately
 const {productId}=req.body;
    const {content}=req.body;
    if(!content){
        return res.status(400).json({error:"Content is required"});
    }
    //verfiy if product exit
    //we are fetching the product here 
    const product=await queries.getProductById(productId);
 if(!product){
    return res.status(404).json({error:"Product does not exist"})

 }
 //creating the comment
     const comment= await queries.createComment({
     content,
      userId,
        productId
         })
    res.status(201).json({comment:"Comment created successfully"
       
     })}
    catch(error){
        console.error("Error creating comment:",error);
        res.status(500).json({error:"Failed to create comment"});

    }
}

//delete a comment private
export const deleteComment=async(req:Request,res:Response)=>{
    try{
        const {userId}=getAuth(req);
        if(!userId){
            return res.status(401).json({error:"Unauthorized"});
        }
        const {id}=req.params;
        const comment =await queries.getCommentsById(id as string);
        if(!comment){
            return res.status(404).json({error:"Comment not found"});

        }
        await queries.deleteComment(id as string);
        res.status(200).json({message:"Comment deleted successfully"})
    }
    catch(error){
        console.error("Error deleting comment:",error);
        res.status(500).json({error:"Failed to delete comment"});
    }
}
//get comments by product id public
// export const getCommentsByProductId=async(req:Request,res:Response)=>{
//     try{
//         const {productId}=req.params;
//         const comments=await queries.getCommentsById(productId as string);
//         res.status(200).json({comments});
//     }
//     catch(error){
//         console.error("Error getting comments by product id:",error);
//         res.status(500).json({error:"Failed to get comments by product id"});
//     }}

// //get comments by user id private
// export const getCommentsByUserId=async(req:Request,res:Response)=>{
//     try{
//         const {userId}=getAuth(req);
//         if(!userId){
//             return res.status(401).json({error:"Unauthorized"});
//         }
//         const comments=await queries.getCommentsById(userId);
//         res.status(200).json({comments});
//     }
//     catch(error){
//         console.error("Error getting comments by user id:",error);
//         res.status(500).json({error:"Failed to get comments by user id"});
//     }}