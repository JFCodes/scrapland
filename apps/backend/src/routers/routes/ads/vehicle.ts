import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as GetAllController } from '../../../controllers/ads/vehicle/get-all'

export const router: RouterType = Router()

router.get('/all', GetAllController)
