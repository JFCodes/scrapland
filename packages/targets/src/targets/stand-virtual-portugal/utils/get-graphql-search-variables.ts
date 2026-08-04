import { GraphqlVariables } from '../types'

export function GetGraphqlSearchVariables (
  page: number,
  appendFilters: GraphqlVariables['filters'] = []
): GraphqlVariables {
  const filters: GraphqlVariables['filters'] = []
  // Cars category
  filters.push({ name: "category_id", value: "29" })
  filters.push(...appendFilters)

  return {
    sortBy: 'created_at_first:desc',
    includeSuggestedFilters: false,
    includePriceEvaluation: true,
    includeFiltersCounters: false,
    includeNewPromotedAds: false,
    includePremiumTopAd: false,
    includePromotedAds: false,
    includeSeoSurfaces: false,
    includeSortOptions: false,
    includePriceDrop: true,
    includeCepik: false,
    promotedInput: {},
    experiments: [],
    searchTerms: [],
    after: null,
    maxAge: 60,
    parameters: [
      'origin',
      'make',
      'version',
      'model',
      'engine_code',
      'fuel_type',
      'gearbox',
      'mileage',
      'engine_capacity',
      'engine_power',
      'first_registration_year',
      'year'
    ],
    filters,
    page,
  }
}
