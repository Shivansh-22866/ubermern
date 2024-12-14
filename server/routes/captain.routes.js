import express from 'express'
import { body } from 'express-validator'
import captainController from '../controllers/captain.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage("Email is not valid"),
    body('fullname.firstName').isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body('vehicle.color').isLength({min: 3}).withMessage("Color should be at least 3 characters long"),
    body('vehicle.plate').isLength({min: 3}).withMessage("Plate should be at least 3 characters long"),
    body('vehicle.capacity').isInt({min: 1}).withMessage("Capacity must be at least 1 passenger"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("The vehicle should be of the valid type")
],
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage("Email is not valid"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

export default router