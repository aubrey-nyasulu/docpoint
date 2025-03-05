import express from 'express'
import { searchDoctors } from '../controllers/search.controller.js'

const router = express.Router()

router.get('/doctors', searchDoctors)

export default router