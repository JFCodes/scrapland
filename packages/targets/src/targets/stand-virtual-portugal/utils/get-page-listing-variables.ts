import { T_Task_Ad_Vehicle_FindNew } from '@scrapland/data-model'
// App
import { GetGraphqlSearchVariables } from './get-graphql-search-variables'
import { GraphqlVariables } from '../types'

export function GetPageListingVariables (
  task: T_Task_Ad_Vehicle_FindNew,
  page: number
): GraphqlVariables {
  return GetGraphqlSearchVariables(page, [])
}
