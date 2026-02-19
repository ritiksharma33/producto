import type {Request,Response} from "express";
import * as queries from "../db/querries";
import {getAuth } from "@clerk/express";
// Writing the methods 

//get all product public 
export const getAllProducts= async(req:Request,res:Response)=>{
    try{
        const products=await queries.getAllProducts();
        res.status(200).json({products});

    }
    catch(error){
        console.error("Error getting all products:",error);
        res.status(500).json({error:"Failed to get all products"});
    }
}
//get my product to user private
export const getMyProducts= async(req:Request,res:Response)=>{
    try{
        //we getting the user id and checking if it exit then only allow 
        const{userId}=getAuth(req);
        if(!userId){
            return res.status(401).json({error:"Unauthorized"});
        }
        //our querry is get product by user id we build it before
        const products=await queries.getProductsByUserId(userId);
        res.status(200).json({products});
    }
    catch(error){
        console.error("Error getting my products:",error);
        res.status(500).json({error:"Failed to get my products"});
    }
}
//Get product by id public
export const getProductById= async(req:Request,res:Response)=>{
    try{
        //getting product id from request params
        const {id}=req.params;
        //i forced it here because the id is string and we have defined it as string in our schema
        const product=await queries.getProductById(id as string);
        if(!product){
            return res.status(404).json({error:"Product not found"});
        }
        res.status(200).json({product});
    }
    catch(error){
        console.error("Error getting product by id:",error);
        res.status(500).json({error:"Failed to get product by id"});
    }
}
//create a product private 
export const createProduct= async(req:Request,res:Response)=>{
    try{
        //getting user id from clerk auth
        const {userId}=getAuth(req);
        //checking id user exixts
        if(!userId){
            return res.status(401).json({error:"Unauthorized"});
        }
        //getting product data from request body
        const {title,description,imageUrl}=req.body;
        //cecking if all fields given in request body
        if(!title||!description||!imageUrl){
            return res.status(400).json({error:"missing requires fields"});
        }
        //creating product in database
        const product=await queries.createProduct({
            title,
            description,
         
            imageUrl,
            userId
        });
        //resource has been created
        res.status(201).json({product});
    }
    catch(error){
        console.error("Error creating product:",error);
        res.status(500).json({error:"Failed to create product"});
    }
}

//update proucut private
export const updateProduct= async(req:Request,res:Response)=>{
    try{
        const {userId}=getAuth(req);
        if(!userId){
            return res.status(401).json({error:"Unauthorized"});
        }
        //we have taken id from the paramas of request
        const {id}=req.params;
        const {title,description,imageUrl}=req.body;
        //this are optional fields 
        // if(!title||!description||!imageUrl){
        //     return res.status(400).json({error:"missing requires fields"});
        // }
        //check if product exist and belong to the user
        const existingProduct= await queries.getProductById(id as string);
        if(!existingProduct){
            return res.status(404).json({error:"Product not found"});

        }
        if(existingProduct.userId !== userId){
            return res.status(403).json({error:"You can only update your own products "});
        }
        const product=await queries.updateProduct(id as string,{
            title,
            description,
            imageUrl,
         
        });
        res.status(200).json({product});
    }
    catch(error){
        console.error("Error updating product:",error);
        res.status(500).json({error:"Failed to update product"});
    }}

    //delete product private 
    export const deleteProduct=async (req:Request,res:Response)=>{
        try{
            const {userId}=getAuth(req);
            if(!userId){
                return res.status(401).json({error:"Unauthorized"});
            }
            //then if exist we will take the id to delete
            const {id}=req.params;
            //check if product belong to existing user and it will exist 
                    const existingProduct= await queries.getProductById(id as string);
                  if(!existingProduct){
                    return res.status(404).json({error:"Product not found"});
                  }
                  //we have defined this in the relations connecting the user id with the product 
                  if(existingProduct.userId!=userId){
                    return res.status(403).json({error:"You can only delete your own products"});


                  }
                  //we have defiend delete in querries 
                  await queries.deleteProduct(id as string);
                  res.status(200).json({message:"Product deleted successfully"});
        }
        catch(error){
            console.error("Error deleting product:",error);

            res.status(500).json({error:"Failed to delete product"});
        }
    }