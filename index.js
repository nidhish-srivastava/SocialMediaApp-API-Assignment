import express from "express"
const app = express()
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectmongodb } from "./utils/connectToDb.js"
import userRoutes from "./routes/user.route.js"
import commentRoutes from "./routes/comment.route.js"
import postRoutes from "./routes/post.route.js"
import dotenv from "dotenv"
dotenv.config()

const port = 3000 || process.env.PORT
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    // origin : ["http://localhost:5173"], // add the domain u want to allow
    credentials : true
}))

const start = async() =>{
    await connectmongodb()
    app.listen(port,()=>{
        console.log(`Server is listening at port ${port}`);
    })
}
start()


app.use("/api/v1/user",userRoutes)
app.use("/api/v1/post",postRoutes)
app.use("/api/v1/comment",commentRoutes)

export default app  