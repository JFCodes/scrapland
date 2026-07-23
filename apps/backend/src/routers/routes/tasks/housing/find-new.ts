import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as FindNewPatch } from '../../../../controllers/tasks/housing/find-new/patch'

export const router: RouterType = Router()

router.patch('/:taskId', FindNewPatch)
