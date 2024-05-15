import express from "express";
import { complaintUpload, getStudent, olevelverify, updateUser, uploadClearance } from "../Controllers/user.js";
import multer from "multer";
import auth from "../Middlewares/jwtValidate.js";


const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const Router = express.Router()
const upload = multer({ storage: storage })



Router.get('/:studentId', auth, getStudent)
Router.put('/:studentId', auth, updateUser)
Router.post('/complaint', auth, complaintUpload)
Router.post('/clearance', auth, upload.any(), uploadClearance)
Router.post('/olevelverify',auth, upload.single('WAEC_NECO'), olevelverify)

export default Router;