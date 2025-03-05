import dotenv from "dotenv"
dotenv.config()
import createServer from "./server.js"
import connectDB from "./config/connectDB.js"

const port = process.env.PORT || 5000

const startServer = async () => {
    try {
        const dbConnection = await connectDB()

        dbConnection.once('open', () => {
            console.log("MongoDB Connected...")

            const app = createServer()

            app.listen(port, () => {
                console.log(`Server is running on port ${port}`)
            })
        })
    } catch (error) {
        console.error("Error starting the server:", error)
        process.exit(1) // Exit with failure
    }
}

// Global error handling for unexpected failures
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err)
    process.exit(1)
})

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason)
    process.exit(1)
})

startServer()
