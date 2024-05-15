import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import authRoutes from "./Routes/Auth/Auth.js"
import userRoutes from "./Routes/user.js"
import path, {dirname} from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()

app.use('/api/uploads', express.static(`${__dirname}/uploads`));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", authRoutes)
app.use("/api/user", userRoutes)

app.get("/", (req, res) => {
    res.send("APP IS RUNNING")
})
app.use("*", (req, res) => {
    res.status(404).json({ message: "API does not exist." })
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