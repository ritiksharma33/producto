//this hook to add the tokken to the api request 
import React from 'react'
import {useAuth} from "@clerk/clerk-react";
import {useEffect} from "react";
import api from "../lib/axios";
//axios have interceptor to addd anything to our request
const useAuthReq = () => {
    const {isSignedIn,getToken,isLoaded}=useAuth();
    //include the tokkedn to the request headers
    useEffect(()=>{
const interceptor= api.interceptors.request.use(async(config)=>{
    if(isSignedIn){
        //this silly thing casuing whole bug 
        const token= await getToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }}
    return config;
});
//this is clean up method for the token 
    return ()=>api.interceptors.request.eject(interceptor);

    },[isSignedIn,getToken])
   return {isSignedIn,isClerkLoaded:isLoaded};
}

export default useAuthReq
