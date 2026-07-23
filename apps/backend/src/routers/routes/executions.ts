import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as GetAllController } from '../../controllers/executions/get-all'
// Routes

export const router: RouterType = Router()

router.get('/all', GetAllController)
