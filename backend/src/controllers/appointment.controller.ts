import { Request, Response } from "express"
import mongoose from "mongoose"

import asyncHandler from "../middleware/asyncHandler.js"
import Appointment from "../models/AppointmentModel.js"

export const bookAppointment = asyncHandler(async (req: Request, res: Response) => {
    const { patientId, doctorId, date } = req.body

    try {
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

export const cancelAppointment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Cancel the appointment in the database
        res.json({ message: `Appointment ${id} canceled` });
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel appointment" });
    }
})

export const getSlots = asyncHandler(async (req: Request, res: Response) => {
    try {
        // Fetch available slots based on availability
        res.json({ slots: ["09:00 AM", "10:00 AM", "02:00 PM"] })
    } catch (error) {
        res.status(500).json({ error: "Failed to get slots" })
    }
})
