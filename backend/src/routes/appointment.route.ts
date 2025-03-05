import express from 'express'
import { bookAppointment, cancelAppointment, getSlots, } from '../controllers/appointment.controller.js'

const router = express.Router()

router.get('/slots', getSlots)
router.post('/book', bookAppointment)
router.delete('/:id/cancel', cancelAppointment)

export default router