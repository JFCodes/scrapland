import type { NextFunction, Request, Response } from 'express'
import type { T_API_Response_AppSettings } from '@scrapland/data-model'
// App
import { AppSettings } from '../instances/app-settings'

export function controller(_: Request, res: Response<T_API_Response_AppSettings>) {
  res.status(200).json(AppSettings.settings)
}
