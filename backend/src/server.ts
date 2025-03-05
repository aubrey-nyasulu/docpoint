import express from 'express'
import cors from 'cors'

import accountRoute from './routes/account.route.js'
import userRoute from './routes/user.route.js'
import appointmentRoute from './routes/appointment.route.js'
import searchRoute from './routes/search.route.js'
import analyticsRoute from './routes/analytics.route.js'
import errorHandler from "./middleware/errorHandler.js"

const createServer = () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded())

    app.use('/api/v1/account', accountRoute)
    app.use('/api/v1/user', userRoute)
    app.use('/api/v1/appointment', appointmentRoute)
    app.use('/api/v1/search', searchRoute)
    app.use('/api/v1/analytics', analyticsRoute)

    app.use(errorHandler)

    return app
}

export default createServer
