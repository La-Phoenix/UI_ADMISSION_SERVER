import express from "express";
import { getAllUsers, signIn, signUp } from "../../Controllers/auth.js";
import auth from "../../Middlewares/jwtValidate.js";

const Router = express.Router()


Router.get("/", auth, getAllUsers);
Router.post("/signup", signUp);
Router.post("/signin", signIn)

export default Router;