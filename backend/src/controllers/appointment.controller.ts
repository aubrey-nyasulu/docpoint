import { Request, Response } from "express"
import mongoose from "mongoose"

import asyncHandler from "../middleware/asyncHandler.js"
import Appointment from "../models/AppointmentModel.js"
import User from "../models/UserModel.js"

export const bookAppointment = asyncHandler(async (req: Request, res: Response) => {
    const { patientId, doctorId, date } = req.body

    try {
        const doctor = await User.findById(doctorId)
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found." })
        }

        const session = await mongoose.startSession()
        session.startTransaction()

        const existingAppointment = await Appointment.findOne({ doctorId, date }).session(session)
        if (existingAppointment) {
            await session.abortTransaction()
            session.endSession()
            return res.status(400).json({ message: "This time slot is already booked." })
        }

        const newAppointment = new Appointment({ patientId, doctorId, date, status: "pending" })
        await newAppointment.save({ session })

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({ message: "Appointment booked successfully" })
    } catch (error) {
        console.log({ error })
        res.status(500).json({ message: "Server Error" })
    }
})


// Get available slots for a doctor on a given date
export const getSlots = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { doctorId, date } = req.query

        if (!doctorId || !date) {
            return res.status(400).json({ error: "Doctor ID and date are required." })
        }

        // Find the doctor's availability schedule
        const doctor = await User.findById(doctorId)
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found." })
        }

        const allSlots = doctor.availability || []

        // Find booked slots for the given date
        const bookedAppointments = await Appointment.find({ doctorId, date })
        const bookedSlots = bookedAppointments.map(app => app.date)

        // Filter available slots
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot.day))

        res.json({ availableSlots })
    } catch (error) {
        res.status(500).json({ error: "Failed to get slots" })
    }
})

// Cancel an appointment
export const cancelAppointment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log({ id })

        const session = await mongoose.startSession()
        session.startTransaction()

        const appointment = await Appointment.findById(id).session(session)
        console.log({ appointment })
        if (!appointment) {
            await session.abortTransaction()
            session.endSession()
            return res.status(404).json({ error: "Appointment not found." })
        }

        await Appointment.deleteOne({ _id: id }).session(session)

        await session.commitTransaction()
        session.endSession()

        res.json({ message: `Appointment ${id} canceled successfully` })
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel appointment" })
    }
})

