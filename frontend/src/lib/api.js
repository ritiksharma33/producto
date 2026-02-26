//write all the calls from the api 
import api from "./axios"


///USERS API
export const syncUser= async(userData)=>{
    //we need to send the user data we get from clerk to our backend so that we can create or update the user in our database and return the user data to the frontend
    const {data}=await api.post("/users/sync",userData);
    return data;
}
///Product api
 export const getAllProducts= async()=>{
    const {data}=await api.get("/products");
    return data;
 }
 //get single product
export const getProductById= async(id)=>{
    const {data}=await api.get(`/products/${id}`);
    return data;
}
//GET MY PRODUCTS
export const getMyProducts= async()=>{
    const {data}=await api.get("/products/my");
    return data;
}
//CREATE PRODUCT
export const createProduct= async(productData)=>{
    const {data}=await api.post("/products",productData);
    return data;
}
//UPDATE PRODUCT
export const updateProduct= async(id,...productData)=>{
    const {data}=await api.put(`/products/${id}`,productData);
    return data;
}
//DELETE PRODUCT
export const deleteProduct= async(id)=>{
    const {data}=await api.delete(`/products/${id}`);
    return data;
}
//COMMENTS API
//CREATE COMMENT
export const createComment = async ({ productId, content }) => {
  const { data } = await api.post(`/comments/${productId}`, { content });
  return data;
};

export const deleteComment = async ({ commentId }) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};