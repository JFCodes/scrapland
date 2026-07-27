import { Router, type Router as RouterType } from 'express'
// Controller
// Routes
import { router as HousingRouter } from './ads/housing'

export const router: RouterType = Router()

router.use('/housing', HousingRouter)
