import mongoose from "mongoose"

mongoose.set('strictQuery', true)

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI as string)

        return mongoose.connection
    } catch (error) {
        console.error("MongoDB Connection Failed:", error)
        process.exit(1)
    }
}

export default connectDB
