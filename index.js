import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectmongodb } from "./utils/connectToDb.js"
import dotenv from "dotenv"
import swaggerui from "swagger-ui-express"
import router from "./routes/index.js"
import swaggerDocument from "./swagger-output.json" assert {type : "json"}

const app = express()
dotenv.config()

const port = 3000 || process.env.PORT
app.use(express.json())
app.use(cookieParser())

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument))
app.use(cors({
    credentials: true
}))

const start = async () => {
    await connectmongodb()
    app.listen(port, () => {
        console.log(`Server is listening at port ${port}`);
    })
}
start()

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is running."
    });
});
app.use(router)


export default app  