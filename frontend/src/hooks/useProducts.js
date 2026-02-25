import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";
//WE Are querriying from the get all product api 
//hook aare the resualble code of functions we will call them in the program 
export const  useProducts=()=>{
    const result = useQuery({queryKey:["products"],queryFn:getAllProducts});
    return result;
}
export const  useCreateProduct=()=>{
    //for creating something we use mutaion not queery
    //in api file we create the hook  
    //this iwll mutate te createprodyct in the call it api.js and in that file it wil hit the endpoint 
   return  useMutation ({mutationFn:createProduct})
}
//---------------
