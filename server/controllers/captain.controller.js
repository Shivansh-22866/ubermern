import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import { validationResult } from "express-validator";

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

export default {registerCaptain}