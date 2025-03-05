import { Request, Response } from "express"

import asyncHandler from "../middleware/asyncHandler.js"
import { doctors } from "./search.controller.js"

export const getDoctorProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const doctor = doctors.find(doc => doc.id === id)

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" })
        }

        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch doctor profile" })
    }
})

export const getAvailability = asyncHandler(async (req: Request, res: Response) => {
    try {
        // Fetch availability from the database
        res.json({ availableHours: ["09:00-12:00", "14:00-17:00"] })
    } catch (error) {
        res.status(500).json({ error: "Failed to get availability" })
    }
})

export const updateAvailability = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { availableHours } = req.body
        // Update availability in the database
        res.json({ message: "Availability updated", availableHours })
    } catch (error) {
        res.status(500).json({ error: "Failed to update availability" })
    }
})
