import captainModel from "../models/captain.model.js";

const createCaptain = async({firstName, lastName, email, password, color, plate, capacity, vehicleType}) => {
    
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("Missing fields are required")
    }

    const captain = await captainModel.create({
        fullname: {
            firstName,
            lastName
        },
        email: email,
        password: password,
        vehicle: {
            color: color,
            plate: plate,
            capacity: capacity,
            typeVehicle: vehicleType
        }
    })

    return captain
}

export default {createCaptain}