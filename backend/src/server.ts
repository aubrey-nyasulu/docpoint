import express from 'express'
import cors from 'cors'

import errorHandler from "./middleware/errorHandler.js"

const createServer = () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded())

    app.get('/api/v1/hello', (_req, res) => {
        res.json({ message: 'hello world!' })
    })

    app.use(errorHandler)

    return app
}

export default createServer
