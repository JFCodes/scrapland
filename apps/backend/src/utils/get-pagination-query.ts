import { T_API_Pagination } from '@scrapland/data-model';
import type { Request } from 'express'

const MAX_SIZE = 250
const MIN_SIZE = 10

export function getPagination (req: Request): T_API_Pagination {
  let page = 1
  let size = 50

  const queryPage = req.query.page
  if (queryPage) {
    const queryPageNumber = Number(queryPage)
    if (!isNaN(queryPageNumber) && isFinite(queryPageNumber)) page = queryPageNumber
  }

  const querySize = req.query.size
  if (querySize) {
    const querySizeNumber = Number(querySize)
    if (!isNaN(querySizeNumber)) {
      size = Math.max(MIN_SIZE, Math.min(querySizeNumber, MAX_SIZE))
      console.log({ size })
    }
  }

  return { page, size }
}