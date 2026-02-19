import {Router} from "express"
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";
const router=Router();

//GET /api/product/ PUBLIC
router.get("/",productController.getAllProducts);

//GET /api/product/my PRIVATE 
router.get("/my",requireAuth(),productController.getMyProducts);
//GET /api/product/:id PUBLIC
router.get("/:id",productController.getProductById);
//POST /api/product/ PRIVATE
router.post("/",requireAuth(),productController.createProduct);
//PUT /api/product/:id PRIVATE
router.put("/:id",requireAuth(),productController.updateProduct)
//DELETE /api/product/:id PRIVATE
router.delete("/:id",requireAuth(),productController.deleteProduct);
export default router;