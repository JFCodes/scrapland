import { E_ENTITY_TYPE, E_TASK_STATUS, type T_API_RESPONSE_Error } from '@scrapland/data-model'
import { F_ReadableEnum } from '@scrapland/functions'
import type { Response, Request } from 'express'

type NotFoundOptions = { req: Request, res: Response }
type CustomOptions = {
  error: Omit<T_API_RESPONSE_Error, 'type'>
  res: Response
  req: Request
}

// Generic
type MissingResource = { req: Request, res: Response, resource: E_ENTITY_TYPE, selector: string }
type MissingOrInvalidOptions = { req: Request, res: Response, name: string }
// Tasks
type TaskCannotExecuteNonPublished = { req: Request, res: Response, status: E_TASK_STATUS, taskId: string }
type TaskFailedToScheduleExecution = { req: Request, res: Response, taskId: string }
type TaskPatchFailed = { req: Request, res: Response, taskId: string }

export const notFound = (options: NotFoundOptions): void => {
  const { req, res } = options

  const details = [`Request to path '${req.path}' with method '${req.method}' is not supported`]
  const data: T_API_RESPONSE_Error = {
    message: 'Api request failed #404',
    type: 'api-error',
    level: 'warning',
    code: 404,
    details,
  }
  res.status(404).json(data)
}

export const customError = (options: CustomOptions): void => {
  // TODO: logging with request data
  const { error, res } = options

  const data: T_API_RESPONSE_Error = { type: 'api-error' , level: 'danger', ...error }
  res.status(error.code).json(data)
}

export const missingOrInvalidParam = (options: MissingOrInvalidOptions): void => {
  const { name, req, res } = options

  const message = `Missing or invalid param '${name}'`
  return customError({ req, res,  error: { code: 400, message, level: 'danger' } })
}

export const missingOrInvalidQuery = (options: MissingOrInvalidOptions): void => {
  const { name, req, res } = options

  const message = `Missing or invalid query '${name}'`
  return customError({ req, res,  error: { code: 400, message, level: 'danger' } })
}

export const missingResource = (options: MissingResource): void => {
  const { selector, resource, req, res } = options
  const entityName = F_ReadableEnum(resource)

  return customError({
    req,
    res,
    error: {
      details: [`Entity of type '${entityName}' with selector '${selector}' doesn't exist.`],
      message: `Resource '${entityName}' not found`,
      level: 'danger',
      code: 404,
    }
  })
}

export const taskErrors = {
  cannotExecuteNonPublished: (options: TaskCannotExecuteNonPublished) => {
    const { status, taskId, req, res } = options

    const message = 'Failed to schedule task execution'
    const details = [
      `Cannot execute task with status not '${E_TASK_STATUS.PUBLISHED}'.`,
      `Task with id '${taskId}' has status '${status}'.`,
    ]
    if (status === E_TASK_STATUS.DRAFT) details.push('Published task before scheduling execution.')

    return customError({ req, res, error: { code: 405, message, details} })
  },

  failedToScheduleExecution: (options: TaskFailedToScheduleExecution) => {
    const { taskId, req, res } = options
    const message = 'Failed to schedule task execution'
    const details = [`There was an unknown problem trying to schedule execution for task with id '${taskId}'`]
    return customError({ req, res, error: { code: 500, message, details} })
  },
  
  failedToPatch: (options: TaskPatchFailed) => {
    const { taskId, req, res } = options
    const message = 'Failed to update task'
    const details = [`There was an unknown problem trying to updated task with id '${taskId}'`]
    return customError({ req, res, error: { code: 500, message, details} })
  }
}
