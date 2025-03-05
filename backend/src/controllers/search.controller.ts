import asyncHandler from "../middleware/asyncHandler.js"

import { Request, Response } from "express"
// Mock database (Replace with actual DB queries)
export const doctors = [
    { id: "1", name: "Dr. Alice", specialty: "Cardiologist", location: "New York", experience: 10, slots: ["09:00 AM", "10:00 AM"] },
    { id: "2", name: "Dr. Bob", specialty: "Dermatologist", location: "Los Angeles", experience: 7, slots: ["11:00 AM", "01:00 PM"] },
]

export const searchDoctors = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { specialty, location, name } = req.query

        let filteredDoctors = doctors

        if (specialty) {
            filteredDoctors = filteredDoctors.filter(doc =>
                doc.specialty.toLowerCase() === (specialty as string).toLowerCase()
            )
        }

        if (location) {
            filteredDoctors = filteredDoctors.filter(doc =>
                doc.location.toLowerCase().includes((location as string).toLowerCase())
            )
        }

        if (name) {
            filteredDoctors = filteredDoctors.filter(doc =>
                doc.name.toLowerCase().includes((name as string).toLowerCase())
            )
        }

        res.json({ doctors: filteredDoctors })
    } catch (error) {
        res.status(500).json({ error: "Failed to search doctors" })
    }
})


