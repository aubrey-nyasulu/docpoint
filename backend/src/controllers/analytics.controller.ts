import asyncHandler from "../middleware/asyncHandler.js"

export const getTest = asyncHandler(async (req: any, res: any) => {
    res.json({ message: 'hello from analytics!' })
})