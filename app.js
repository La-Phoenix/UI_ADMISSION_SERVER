import express from "express";
import mongoose from "mongoose";
import cors from "cors"

const app = express()

app.use(cors())

app.get("/", (req, res) => {
    res.send("APP IS RUNNING")
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`LISTENING AT ${port}`);
})