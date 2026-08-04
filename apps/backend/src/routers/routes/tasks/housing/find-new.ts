import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as PostCreate } from '../../../../controllers/tasks/housing/find-new/post-create'
import { controller as Patch } from '../../../../controllers/tasks/housing/find-new/patch'

export const router: RouterType = Router()

router.patch('/:taskId', Patch)
router.post('', PostCreate)
