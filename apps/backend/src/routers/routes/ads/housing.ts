import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as GetAllController } from '../../../controllers/ads/housing/get-all'
import { controller as PatchController } from '../../../controllers/ads/housing/patch'

export const router: RouterType = Router()

router.get('/all', GetAllController)

router.patch('/:adId', PatchController)
