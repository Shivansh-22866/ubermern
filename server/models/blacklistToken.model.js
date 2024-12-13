import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

const blacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema)

export default blacklistToken