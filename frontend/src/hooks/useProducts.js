import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct, getMyProducts } from "../lib/api";
import { use } from "react";

//WE Are querriying from the get all product api 
//hook aare the resualble code of functions we will call them in the program 
export const useProducts = () => {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return result;
};

export const useCreateProduct = () => {
  //for creating something we use mutaion not queery
  //in api file we create the hook  
  //this iwll mutate te createprodyct in the call it api.js and in that file it wil hit the endpoint 
  return useMutation({ mutationFn: createProduct });
};

//---------------
export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    //douoble bang operator check if id is given 
    enabled: !!id,
  });
};

export const useMyProducts = () => {
  return useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      const data = await getMyProducts();
      return data.products; // ✅ FIX: return only the array
    },
  });
};

//for deleting 
export const useDeleteProduct = () => {
  //that querry client is just refreing the page on action completion 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};

//for updating 
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};