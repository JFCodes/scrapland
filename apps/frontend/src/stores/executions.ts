import type { T_Execution } from '@scrapland/data-model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// App
import { usePaginated } from '@/composables/paginated'
import { useApi } from '@/composables/api'

export const useExecutionsStore = defineStore('executions', () => {
  const { executions: executionsApi } = useApi()

  const executions = ref<Array<T_Execution>>([])

  const { load, isLoadingMore, isLoading } = usePaginated(executions, executionsApi.all)

  return {
    load,
    isLoadingMore,
    executions,
    isLoading,
  }
})
