export type PageListingResult = {
  items: Array<PostingSearchItem>
  totalPages: number
}

export type PostingSearchItem = {
  __typename: 'AdvertListItem'
  images: Array<{ __typename: 'AdImage', medium: string, large: string }>
  id: number
  title: string
  slug: string
  estate: 'HOUSE'
  development: null
  developmentId: number
  developmentTitle: string
  developmentUrl: string
  transaction: 'SELL' // and ? 'RENT' ?
  totalPossibleImages: number
  isExclusiveOffer: boolean
  isPrivateOwner: boolean
  isPromoted: boolean
  source: string
  href: string
  openDays: string
  tags: Array<{ __typename: 'AdvertListItemTag', value: string, weight: number }>
  areaInSquareMeters: number
  terrainAreaInSquareMeters: null | number
  roomsNumber: string
  hidePrice: boolean
  floorNumber: null | number
  investmentState: null // ?
  investmentUnitsAreaInSquareMeters: null // ?
  peoplePerRoom: null // ?
  dateCreated: string
  createdAtFirst: string
  investmentUnitsNumber: null // ?
  investmentUnitsRoomsNumber: null // ?
  investmentEstimatedDelivery: null // ?
  pushedUpAt: null | string
  specialOffer: null // ?
  shortDescription: string
  showPremiumTile: boolean
  organisationAssignedMember: null // ?
  rentPrice: null // ?
  priceFromPerSquareMeter: null // ?
  pricePerSquareMeter: null | { __typename: 'Money', value: number, currency: 'EUR' },
  totalPrice: null |  { __typename: 'Money', value: number, currency: 'EUR' },
  agency: null | {
    __typename: 'AgencyListingDetails',
    id: number
    name: string
    slug: string
    imageUrl: string,
    type: 'AGENCY' // and ?
    brandingVisible: boolean
    highlightedAds: boolean
    enhancedBrandingFeatures: Array<string>
  }
  advertOwner: {
    __typename: 'LegacyAdvertOwner'
    name: string
    imageUrl: string
    contacts: Array<string> // ? confirm this
  },
  location: {
    __typename: 'LocationDetails'
    mapDetails: { __typename: 'MapDetails', radius: number }
    address: {
      __typename: 'Address'
      street: null | { __typename: 'Street', name: string, number: string }
      province: { __typename: 'Province', name: string }
      city: { __typename: 'City', name: string }
    }
    reverseGeocoding: {
      __typename: 'ReverseGeocoding'
      locations: Array<{
        __typename: 'BasicLocationObject'
        locationLevel: string
        fullName: string
        name: string
        id: string
      }>
    }
  }
}

export type MultiSearchPaginated = {
  pageProps: {
    data: {
      searchLinksRelatedLocations: unknown
      searchAds: {
        __typename: 'FoundAds'
        items: Array<PostingSearchItem>
        // Unused
        geometries: Array<string>
        locationString: string
        locationsObjects: Array<unknown>
        stats: Array<unknown>
        trackingSet: unknown
        pagination: {
          __typename:  'SearchPagination'
          itemsPerPage: number
          currentPage: number
          totalItems: number
          totalPages: number
        }

      }
    }
    // Unused
    breadcrumbItems: Array<unknown>
    canonicalURL: string
    cookiesCategorisation: {}
    currentUser: null
    desktopHeader: unknown
    estate: 'HOUSE'
    experiments: unknown
    faqDynamicData: null
    featureFlags: Record<string, boolean>
    fieldsMetadataExperimentsVariants: unknown
    filterAttributes: unknown
    filterLocations: unknown
    filteringQueryParams: unknown
    googleSuggestion: null
    lang: string
    laquesisResult: null
    location: string
    locationName: string
    mapPreviewImages: unknown
    market: string
    neighborhoodPoiCategories: unknown
    pageDescription: string
    pageHeading: string
    pageTitle: string
    promotedAgency: null
    shouldEnableIndexingByMetaRobots: boolean
    shouldKeepBoundingBox: boolean
    sortingOption: unknown
    targeting: unknown
    tracking: unknown
    transaction: string
    unconfirmedUserAuthToken: boolean
    urlViewType: string
    userSessionId: string
    viewMode: string
  }
}