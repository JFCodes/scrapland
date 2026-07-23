import type { NextFunction, Request, Response } from 'express'

export function controller(_: Request, res: Response, next: NextFunction) {
  res.set('Cache-Control', 'no-store')
  next()
}
