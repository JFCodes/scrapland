import { GraphqlListingEdge } from './types/edge'

export type GraphqlExtensions = {
  persistedQuery: {
    sha256Hash: string
    version: number
  }
}

export type GraphqlVariables = {
  experiments: Array<{ key: string, variant: string }>
  filters: Array<{ name: string, value: string }>
  promotedInput: Record<string, unknown>,
  includeSuggestedFilters: boolean
  includePriceEvaluation: boolean
  includeFiltersCounters: boolean
  includeNewPromotedAds: boolean
  includePremiumTopAd: boolean
  includePromotedAds: boolean
  includeSeoSurfaces: boolean
  includeSortOptions: boolean
  searchTerms: Array<unknown>
  includePriceDrop: boolean
  parameters: Array<string>
  includeCepik: boolean
  sortBy: string
  maxAge: number
  page: number
  after: null
}


export type GraphqlListing = {
  data: {
    advertSearch: {
      edges: Array<{ node: GraphqlListingEdge }>
      totalCount: number
    }
  }
}