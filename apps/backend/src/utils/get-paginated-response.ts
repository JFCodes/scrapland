import type { T_API_Paginated, T_API_Pagination } from '@scrapland/data-model'

export function getPaginatedResponse <T>(
  all: Array<T>,
  pagination: T_API_Pagination,
): T_API_Paginated<T> {
  const returnBlank = (): T_API_Paginated<T> => ({
    hasMore: false,
    totalPages: 0,
    totalItems: 0,
    data: [],
    size: 0,
    page: 0,
  })

  // TODO: this should come from global constants
  const { page, size } = pagination

  if (size < 1) return returnBlank()
  if (page === 0) return returnBlank()

  const start = (page -1) * size
  const end = start + size
  const data = all.slice(start, end)

  const totalPages = Math.ceil(all.length / size)
  const hasMore = page < totalPages

  return {
    totalItems: all.length,
    totalPages,
    hasMore,
    data,
    page,
    size
  }
}
