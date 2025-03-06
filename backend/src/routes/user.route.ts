import express from 'express'
import { getAvailability, getDoctorProfile, updateAvailability } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/profile/doctor/:id', getDoctorProfile)

router.get('/availability/:doctorId', getAvailability)
router.put('/availability/:doctorId', updateAvailability)

export default router