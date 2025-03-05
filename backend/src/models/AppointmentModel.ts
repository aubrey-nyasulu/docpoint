import { Schema, model, Document } from "mongoose";
import { ObjectId } from "mongodb";


export interface IAppointment extends Document {
  patientId: string | ObjectId;
  doctorId: string | ObjectId;
  date: Date;
  status: "pending" | "confirmed" | "cancelled";
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

const AppointmentModel = model('appointment', AppointmentSchema)
export default AppointmentModel
