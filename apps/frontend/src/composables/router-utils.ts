import { type ComputedRef, type WritableComputedRef, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// App
import type { E_ROUTER_PAGES, E_ROUTER_PARAMS, E_ROUTER_QUERIES } from '@/router/enums'

export function useRouterUtils () {
  const router = useRouter()
  const route = useRoute()

  const routeIsActiveExact = (name: E_ROUTER_PAGES): boolean => {
    return route.name === name
  }

  const routeIsActive = (name: E_ROUTER_PAGES): boolean => {
    if (route.name === name) return true
    return route.matched.some(m => m.name === name)
  }

  const computedStringParam = (param: E_ROUTER_PARAMS): ComputedRef => {
    return computed(() => getStringParam(param))
  }

  const computedHasQuery = (queryKey: E_ROUTER_QUERIES): ComputedRef => {
    return computed(() => route.query[queryKey] !== undefined)
  }

  const computedArrayQuery = (queryKey: E_ROUTER_QUERIES): ComputedRef => {
    return computed(() => getArrayStringQuery(queryKey))
  }

  const writableQuery = (queryKey: E_ROUTER_QUERIES, fallback: string): WritableComputedRef<string> => {
    return computed({
      get: () => getStringQuery(queryKey, fallback),
      set: value => {
        const shallowClone = { ...route.query }
        value !== fallback
          ? shallowClone[queryKey] = value
          : delete shallowClone[queryKey]

        router.replace({ query: shallowClone })
      }
    })
  }

  const writableQueryArray = (queryKey: E_ROUTER_QUERIES): WritableComputedRef<Array<string>> => {
    return computed({
      get: () => getArrayStringQuery(queryKey),
      set: value => {
        const shallowClone = { ...route.query }
        value.length > 0
          ? shallowClone[queryKey] = value
          : delete shallowClone[queryKey]

        router.replace({ query: shallowClone })
      }
    })
  }

  // const writableToggleQuery = (queryKey: E_ROUTER_QUERIES): WritableComputedRef<boolean> => {
  //   return computed({
  //     get: () => route.query[queryKey] !== undefined,
  //     set: value => {
  //       const currentQuery = route.query
  //       const updatedQuery = value
  //         ? { ...currentQuery, [queryKey]: null }
  //         : { ...currentQuery, [queryKey]: undefined }
        
  //       router.replace({ query: updatedQuery })
  //     }
  //   })
  // }

  // 'Private'
  function getStringParam (param: E_ROUTER_PARAMS): null | string {
    const value = route.params[param]
    return typeof value === 'string' ? value : null
  }

  function getStringQuery (queryKey: E_ROUTER_QUERIES, fallback = ''): string {
    const value = route.query[queryKey]
    return typeof value !== 'string' || !value ? fallback : value
  }

  function getArrayStringQuery (queryKey: E_ROUTER_QUERIES): Array<string> {
    const value = route.query[queryKey]

    if (Array.isArray(value)) return value.filter(value => typeof value === 'string')
    if (typeof value === 'string') return [value]
    return []
  }

  return {
    computedStringParam,
    computedArrayQuery,
    writableQueryArray,
    routeIsActiveExact,
    computedHasQuery,
    writableQuery,
    routeIsActive,
  }
}
