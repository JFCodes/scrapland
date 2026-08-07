import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as GetStatusCounterController } from '../../../controllers/ads/vehicle/get-status-counter'
import { controller as GetAllController } from '../../../controllers/ads/vehicle/get-all'
import { controller as PatchController } from '../../../controllers/ads/vehicle/patch'

export const router: RouterType = Router()

router.get('/status-counter', GetStatusCounterController)
router.get('/all', GetAllController)

router.patch('/:adId', PatchController)
