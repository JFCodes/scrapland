import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as GetStatusCounterController } from '../../../controllers/ads/housing/get-status-counter'
import { controller as GetAllController } from '../../../controllers/ads/housing/get-all'
import { controller as PatchController } from '../../../controllers/ads/housing/patch'

export const router: RouterType = Router()

router.get('/status-counter', GetStatusCounterController)
router.get('/all', GetAllController)

router.patch('/:adId', PatchController)
