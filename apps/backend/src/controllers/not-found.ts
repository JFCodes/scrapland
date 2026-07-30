import type { NextFunction, Request, Response } from 'express'
// App
import { notFound } from '../utils/send-error-response'

export function controller(req: Request, res: Response, next: NextFunction) {
  notFound({ req, res})
}
