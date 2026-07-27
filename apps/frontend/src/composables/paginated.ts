import type { T_API_Pagination, T_API_Paginated } from '@scrapland/data-model'
import { type Ref, ref } from 'vue'
// App
import type { RequestQueryValues } from '@/api/types'

export function usePaginated<T> (
  data: Ref<Array<T>>,
  request: (pagination: T_API_Pagination, query?: RequestQueryValues) => Promise<T_API_Paginated<T>>,
  pageSize = 50
) {

  const isLoadingMore = ref(false)
  const isLoading = ref(false)
  const hasMore = ref(false)
  const size = ref(pageSize)
  const totalItems = ref(0)
  const page = ref(1)

  const load = async (query?: RequestQueryValues) => {
    if (isLoading.value) return // Already in-flight request

    isLoading.value = true
    hasMore.value = true
    page.value = 1
    
    request({ page: page.value, size: size.value }, query)
      .then(result => {
        totalItems.value = result.totalItems
        hasMore.value = result.hasMore
        data.value = result.data
      })
      .finally(() => isLoading.value = false)
  }

  const loadMore = () => {
    if (isLoadingMore.value) return // Already in-flight request
    if (!hasMore.value) return

    isLoadingMore.value = true
    page.value ++

    request({ page: page.value, size: size.value })
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
