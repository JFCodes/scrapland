import type { T_API_Pagination, T_API_Paginated } from '@scrapland/data-model'
import { type Ref, ref } from 'vue'

export function usePaginated<T> (
  data: Ref<Array<T>>,
  request: (pagination: T_API_Pagination) => Promise<T_API_Paginated<T>>,
  pageSize = 50
) {

  const isLoadingMore = ref(false)
  const isLoading = ref(false)
  const hasMore = ref(false)
  const size = ref(pageSize)
  const page = ref(1)

  const load = async () => {
    isLoading.value = true
    hasMore.value = true
    page.value = 1
    
    request({ page: page.value, size: size.value })
      .then(result => {
        hasMore.value = result.hasMore
        data.value = result.data
      })
      .finally(() => isLoading.value = false)
  }

  const loadMore = () => {
    if (!hasMore.value) return

    isLoadingMore.value = true
    page.value ++

    request({ page: page.value, size: size.value })
      .then(result => {
        hasMore.value = result.hasMore
        data.value.push(...result.data)
      })
      .finally(() => isLoadingMore.value = false)
  }

  return {
    loadMore,
    load,
    isLoadingMore,
    isLoading,
    hasMore
  }
}
