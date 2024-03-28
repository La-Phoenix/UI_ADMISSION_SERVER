import express from "express";
import { olevelverify, uploadClearance } from "../Controllers/user.js";
import multer from "multer";
import auth from "../Middlewares/jwtValidate.js";


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

Router.post('/clearance', auth, upload.any(), uploadClearance)
Router.post('/olevelverify', auth, upload.any(), olevelverify)

export default Router;