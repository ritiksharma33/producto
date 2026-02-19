import {Router} from "express"

import * as commentController from "../controllers/commentController";
import { requireAuth } from "@clerk/express";
const router=Router();

//POST /api/comments/:productId PRIVATE
router.post("/:productId",requireAuth(),commentController.createComment);
//DELETE /api/comments/:commentId PRIVATE
router.delete("/:commentId",requireAuth(),commentController.deleteComment);
//GET /api/comments/product/:productId PUBLIC
// router.get("/product/:productId",commentController.getCommentsById);

export default router;