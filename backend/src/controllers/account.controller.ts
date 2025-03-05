import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/UserModel.js";
import asyncHandler from "../middleware/asyncHandler.js"

export const getTest = asyncHandler(async (req: any, res: any) => {
    res.json({ message: 'hello from account!' })
})

export const register = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, email, password, role, specialty, location } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role, specialty, location });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        res.json({ token });
    } catch (error) {
        console.log({ error })
        res.status(500).json({ message: "Server Error" });
    }
})
