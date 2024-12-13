import express, { urlencoded } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js"

dotenv.config()


const app = express()
import connectToDB from "./db/db.js";
connectToDB()
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/users", userRoutes)

export default app