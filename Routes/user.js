import express from "express";
import { uploadClearance } from "../Controllers/Clearance.js";
import multer from "multer";


const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    }
})

const upload = multer({ storage: storage })



const Router = express.Router()

Router.post('/clearance', upload.any(), uploadClearance)

export default Router;