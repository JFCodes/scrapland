import type { Request } from 'express'

export function getWsClientIdHeader (req: Request): null | string {
  const clientId = req.headers['ws-client-id']
  if (typeof clientId !== 'string') return null
  if (!clientId) return null

  return clientId
}