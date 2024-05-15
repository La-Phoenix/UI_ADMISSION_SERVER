import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    matric_no: { type: String, required: true },
    password: { type: String, required: true },
    scratchCardPin: { type: String, default: "" },
    postUtmeScore: { type: Number, default: 0},
    isVerfifyOlvl: { type: Boolean, default: false},
    isChangeOfCourse: { type: Boolean, default: false},
    isTransfer: { type: Boolean, default: false},
    isClearanceUpload: { type: Boolean, default: false},
    isAdmin: { type: Boolean, default: false},
    courses: { type: [String], default: []},
    complaints: { type: String, default: ""},
    documents: { type: [Object], default: []},
    createdAt: { type: Date, default: new Date()}
})

const User = mongoose.model("User", userSchema)

export default User;