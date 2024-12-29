import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const captainSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            required: true,
            type: String,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: [6, "Password should be at least 6 characters long"],
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Colour should be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate number should be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Vehicle capacity should be at least 1 passenger"]
        },
        typeVehicle: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lon: {
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10)
}


const captainModel = mongoose.model("Captain", captainSchema)

export default captainModel