import express from "express"
import { createPost, listAllPosts } from "../controllers/post.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/",verifyJWT,createPost)
router.get("/",listAllPosts)

export default router