export type T_API_Pagination = {
  page: number
  size: number
}

export type T_API_Paginated<T> = {
  data: Array<T>
  totalPages: number
  totalItems: number
  hasMore: boolean
  page: number
  size: number
}
