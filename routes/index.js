import postRoutes from "./post.route.js"
import userRoutes from "./user.route.js"
import commentRoutes from "./comment.route.js"
import express from "express"
const router = express.Router();

router.use("/api/v1/user",userRoutes)
router.use("/api/v1/post",postRoutes)
router.use("/api/v1/comment",commentRoutes)


export default router