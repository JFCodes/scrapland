import { Router, type Router as RouterType } from 'express'
// Controller
// Routes
import { router as FindNewRouter } from './housing/find-new'

export const router: RouterType = Router()

router.use('/find-new', FindNewRouter)
