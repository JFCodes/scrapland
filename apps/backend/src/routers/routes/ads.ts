import { Router, type Router as RouterType } from 'express'
// Controller
// Routes
import { router as HousingRouter } from './ads/housing'
import { router as VehicleRouter } from './ads/vehicle'

export const router: RouterType = Router()

router.use('/housing', HousingRouter)
router.use('/vehicle', VehicleRouter)
