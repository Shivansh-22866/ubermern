import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import { validationResult } from "express-validator";
import blacklistToken from "../models/blacklistToken.model.js";

const registerCaptain = async(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password, vehicle} = req.body


    const isCaptainExists = await captainModel.findOne({email})

    if(isCaptainExists) {
        return res.status(400).json({message: "Same email has already been registered"})
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstName: fullname.firstName,
        lastName: fullname.lastName,
        email: email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = captain.generateAuthToken()

    res.status(201).json({captain, token})
}

const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    const captain = await captainModel.findOne({email}).select("+password")

    if(!captain) {
        return res.status(401).json({message: "Invalid email or password"})
    }

    const isMatch = await captain.comparePassword(password)

    if(!isMatch) {
        return res.status(401).json({message: "Invalid email or password"})
    }

    const token = captain.generateAuthToken()

    res.cookie('token', token)

    res.status(200).json({captain, token})
}

const getCaptainProfile = async(req, res, next) => {
    res.status(200).json({captain: req.captain})
}

const logoutCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistToken.create({token})
    res.clearCookie('token')
    res.status(200).json({message: "Logged Out"})
}

export default {registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain}