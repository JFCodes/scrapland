import type { T_Execution } from '@scrapland/data-model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// App
import { usePaginated } from '@/composables/paginated'
import { API } from '@/api'

export const useExecutionsStore = defineStore('executions', () => {

  const executions = ref<Array<T_Execution>>([])

  const { load, isLoadingMore, isLoading } = usePaginated({ data: executions, request: API.executions.all })

  return {
    load,
    isLoadingMore,
    executions,
    isLoading,
  }
})
