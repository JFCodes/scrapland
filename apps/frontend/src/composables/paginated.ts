import type { T_API_Pagination, T_API_Paginated } from '@scrapland/data-model'
import { type Ref, ref } from 'vue'
// App
import type { RequestQueryValues } from '@/api/types'
import { useApiErrorHandling } from '@/composables/api-error-handling'

const DEFAULT_PAGE_SIZE = 50

type Options<T> = {
  request: (pagination: T_API_Pagination, query?: RequestQueryValues) => Promise<T_API_Paginated<T>>
  data: Ref<Array<T>>
  pageSize?: number
}

export function usePaginated<T> (options: Options<T>) {
  const { onApiError } = useApiErrorHandling()
  const { request, data, pageSize } = options

  let lastQuery: RequestQueryValues = {}

  const size = ref(pageSize || DEFAULT_PAGE_SIZE)
  const isLoadingMore = ref(false)
  const isLoading = ref(false)
  const hasMore = ref(false)
  const totalItems = ref(0)
  const page = ref(1)

  const load = async (query?: RequestQueryValues) => {
    if (isLoading.value) return // Already in-flight request

    lastQuery = query ? JSON.parse(JSON.stringify(query)) : {}
    isLoading.value = true
    hasMore.value = true
    page.value = 1
    
    request({ page: page.value, size: size.value }, query)
      .then(result => {
        totalItems.value = result.totalItems
        hasMore.value = result.hasMore
        data.value = result.data
      })
      .catch(onApiError)
      .finally(() => isLoading.value = false)
  }

  const loadMore = () => {
    if (isLoadingMore.value) return // Already in-flight request
    if (!hasMore.value) return

    isLoadingMore.value = true
    page.value ++

    request({ page: page.value, size: size.value }, lastQuery)
      .then(result => {
        totalItems.value = result.totalItems
        hasMore.value = result.hasMore
        data.value.push(...result.data)
      })
      .finally(() => isLoadingMore.value = false)
  }

  return {
    loadMore,
    load,
    isLoadingMore,
    totalItems,
    isLoading,
    hasMore
  }
}
