import userModel from "../models/user.model.js";
import userService from '../services/user.service.js'
import { validationResult } from "express-validator";

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

    res.status(200).json({user, token})
}


export default {registerUser, loginUser}