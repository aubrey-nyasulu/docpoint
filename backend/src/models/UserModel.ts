import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "doctor" | "patient";
    specialty?: string;
    location?: string;
    availability?: { day: string; time: string }[];
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["doctor", "patient"], required: true },
        specialty: { type: String },
        location: { type: String },
        availability: [
            {
                day: { type: String },
                time: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const UserModel = model('user', UserSchema)

export default UserModel
