import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false},
    courses: { type: [String], default: []},
    complaints: { type: [String], default: []},
    documents: { type: [String], default: []},
    createdAt: { type: Date, default: new Date()}
})

const User = mongoose.model("User", userSchema)

export default User;