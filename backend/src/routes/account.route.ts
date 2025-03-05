import express from 'express'
import { getTest, login, register } from '../controllers/account.controller.js'

const router = express.Router()

router.get('/test', getTest)

router.post('/login', login)

router.post('/register', register)

export default router