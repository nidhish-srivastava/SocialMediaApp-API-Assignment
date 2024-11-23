import express from "express"
import { createComment } from "../controllers/comment.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/",verifyJWT,createComment)

export default router