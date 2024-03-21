import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import authRoutes from "./Routes/Auth/Auth.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/user", authRoutes)

app.get("/", (req, res) => {
    res.send("APP IS RUNNING")
})

const url = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

mongoose
    .connect(url)
    .then(() => {
        app.listen(port, () => {
            console.log(`LISTENING AT ${port}`);
        })
    }).catch((e) => {
        console.log(e)
    })