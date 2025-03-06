import { Request, Response } from "express"
import mongoose from "mongoose"

import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/UserModel.js"

// Get Doctor Profile by ID
export const getDoctorProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid doctor ID" })
        }

        const doctor = await User.find({ _id: id, role: 'doctor' }).select("-password") // Exclude sensitive data like password

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" })
        }

        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch doctor profile" })
    }
})

// Get Doctor's Availability
export const getAvailability = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params
        console.log({ doctorId })

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ error: "Invalid doctor ID" })
        }

        const doctor = await User.findById(doctorId).select("availability")

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" })
        }

        res.json({ availableHours: doctor.availability }) // Assuming availability is stored in DoctorModel
    } catch (error) {
        res.status(500).json({ error: "Failed to get availability" })
    }
})

// Update Doctor's Availability
export const updateAvailability = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params
        const { availableHours } = req.body
        console.log({ availableHours })

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ error: "Invalid doctor ID" })
        }

        const doctor = await User.findById(doctorId)

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" })
        }

        console.log('doc av', doctor.availability)
        const slotIsFilled = doctor.availability?.find(slot => {
            const date1 = new Date(slot.day).toLocaleString()
            const date2 = new Date(availableHours.day).toLocaleString()

            console.log({ date1, date2 })

            return (
                slot.time === availableHours.time &&
                date1 === date2
            )
        })

        if (slotIsFilled) return res.status(400).json({ error: "Slot not available" })

        doctor.availability = [...doctor.availability || [], availableHours]
        await doctor.save()

        res.json({ message: "Availability updated successfully", availableHours })
    } catch (error) {
        res.status(500).json({ error: "Failed to update availability" })
    }
})
