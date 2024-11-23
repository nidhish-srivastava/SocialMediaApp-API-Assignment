import express from "express"
import { currentUser, login, logout, register } from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/current-user",verifyJWT,currentUser)

export default router
