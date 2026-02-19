import type {Request,Response} from "express";
import * as queries from "../db/querries";
import {getAuth } from "@clerk/express";

export const syncUser=async(req:Request,res:Response)=>{
    
    try{
        //getting user id from clerk auth
        const {userId}=getAuth(req);
        //checking id user exixts
        if(!userId){
            return res.status(401).json({error:"Unauthorized"});
        }
        //getting user data from request body
        const{email,name ,imageUrl}=req.body;
        //cecking if all fields given in request body
        if(!email||!name||!imageUrl){
            return res.status(400).json({error:"missing requires fields"});
        }
        //if all correct then upsert user to database
        const user=await queries.upsertUser({
            id:userId,
            email,
            name,
            imageUrl
        })
        res.status(200).json({user});

    }
catch(error){
        console.error("Error syncing user:",error);
        res.status(500).json({error:"Failed to sync user"});
}

}