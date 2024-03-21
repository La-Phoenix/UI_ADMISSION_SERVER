import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";

export const signUp = async (req, res) => {
    const {email, password} = await req.body;
    if(!email && !password){
        return res.status(400).json({
            message: "Email and Password Field must be filled."
        })
    }
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: "User exists. If user, try signin up..."
            }) 
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            isAdmin: email === "admin@gmail.com"? true : false,
        })

        const token = jwt.sign(
            {
                email: result.email,
                id: result._id,
                isAdmin: result.isAdmin,
            },
            process.env.JWTSECRET,
            {
                expiresIn: "72h",
            }
        )

        return res.status(200).json({ result, token })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Something went wrong. Please try again later..." })
    }
}

export const signIn = async (req, res) => {
    const {email, password } = req.body;
    if(!email && !password){
        return res.status(400).json({
            message: "Email and Password Field must be filled."
        })
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist." });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if(isPasswordCorrect) {
            const token = jwt.sign(
                {
                  email: existingUser.email,
                  id: existingUser._id,
                  isAdmin: existingUser.isAdmin
                },
                process.env.JWTSECRET,
                {
                  expiresIn: "72h",
                }
            );
            return res.status(200).json({
                result: existingUser,
                token,
            });
            
        } else {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
}