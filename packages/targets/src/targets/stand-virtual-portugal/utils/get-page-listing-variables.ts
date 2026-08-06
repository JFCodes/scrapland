import { T_Task_Ad_Vehicle_FindNew } from '@scrapland/data-model'
// App
import { GetGraphqlSearchVariables } from './get-graphql-search-variables'
import { GraphqlVariables } from '../types'

export function GetPageListingVariables (
  task: T_Task_Ad_Vehicle_FindNew,
  page: number
): GraphqlVariables {

  const appendFilters: GraphqlVariables['filters'] = []

  if (task.brand) {
    let value = task.brand
    if (task.model) value += `|${task.model}`

    appendFilters.push({ name: 'make_model_engine_code', value })
  }

  return GetGraphqlSearchVariables(page, appendFilters)
}
