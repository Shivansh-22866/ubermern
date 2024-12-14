import userModel from "../models/user.model.js";
import userService from '../services/user.service.js'
import { validationResult } from "express-validator";
import blacklistToken from "../models/blacklistToken.model.js";

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, password, email} = req.body

    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({firstName: fullname.firstName, lastName: fullname.lastName, email, password: hashedPassword})

    const token = user.generateAuthToken()

    res.status(201).json({user, token})
};

const loginUser = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body

    const user = await userModel.findOne({email}).select("+password")

    if(!user) {
        return res.status(401).json("Invalid email or password")
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch) {
        return res.status(401).json("Invalid email or password")
    }

    const token = user.generateAuthToken()

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000
    })

    res.status(200).json({user, token})
}

const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

const logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistToken.create({token})
    res.clearCookie('token')
    res.status(200).json({message: "Logged Out"})
}

export default {registerUser, loginUser, getUserProfile, logoutUser}