type GraphqlListingEdgeCategory = { __typename: 'category', id: '29' }

type GraphqlListingEdgeImage = {
  __typename: 'Image'
  x1: 'https://ireland.apollo.olxcdn.com/v1/files/cgelmqqrz7gp-STDVTLPT/image;s=320x240'
  x2?: 'https://ireland.apollo.olxcdn.com/v1/files/cgelmqqrz7gp-STDVTLPT/image;s=640x480'
}

type GraphqlListingEdgePriceEvaluation = {
  __typename: 'PriceEvaluation'
  indicator: 'ABOVE' | 'IN' | 'BELOW'
}

export type GraphqlListingEdgeParameterKey = 
  | 'make'
  | 'version'
  | 'model'
  | 'engine_code'
  | 'fuel_type'
  | 'gearbox'
  | 'mileage'
  | 'engine_capacity'
  | 'engine_power'
  | 'first_registration_year'
  | 'origin'

export type GraphqlListingEdgeParameter = {
  __typename: 'AdvertParameter'
  key: GraphqlListingEdgeParameterKey
  displayValue: string
  label: string
  value: string
}

type GraphqlListingEdgePriceDrop = {
  __typename: 'AdPriceDrop'
  percentage: number // 0-100
  lowestPrice: {
    __typename: 'AdPrice'
    currencyCode: 'EUR'
    minorAmount: 6299000
    isNet: false
  },
}

type GraphqlListingEdgeBrandProgram = {
  __typename: 'BrandProgram'
  searchUrl: string
  name: string
  logo: GraphqlListingEdgeImage
}

type GraphqlListingEdgeSellerLink = {
  __typename: 'AdvertSellerLink'
  logo: null | GraphqlListingEdgeImage
  isCreditIntermediary: boolean
  websiteUrl: string
  name: string
  id: string
}

type GraphqlListingEdgePrice = {
    __typename: 'Price',
    amount: {
      __typename: 'Money'
      currencyCode: 'EUR' // | or?
      value: string
      units: number
      nanos: 0
    },
    badges: Array<string>
    isGross: boolean
    grossPrice: null // or ?
    netPrice: null // or ?
}

export type GraphqlListingEdge = {
  __typename: 'Advert'
  priceEvaluation: GraphqlListingEdgePriceEvaluation
  parameters: Array<GraphqlListingEdgeParameter>
  sellerLink: GraphqlListingEdgeSellerLink
  category: GraphqlListingEdgeCategory
  thumbnail: GraphqlListingEdgeImage
  price: GraphqlListingEdgePrice
  sellerUUID: string
  createdAt: string

  shortDescription: string
  badges: Array<string>
  title: string
  url: string
  id: string

  // Nullable
  brandProgram: null | GraphqlListingEdgeBrandProgram // or ?
  priceDrop: null | GraphqlListingEdgePriceDrop
  standId: null | string

  isPremiumTopAd: null
  originAdId: null
}

// To add later:
  // "location": {
  //   "__typename": "Location",
  //   "city": {
  //     "__typename": "AdministrativeLevel",
  //     "name": "Rio Tinto"
  //   },
  //   "region": {
  //     "__typename": "AdministrativeLevel",
  //     "name": "Porto"
  //   }
  // },

  //   "dealer4thPackage": {
  //   "__typename": "AdvertDealer4thPackage",
  //   "package": {
  //     "__typename": "SellerPackage",
  //     "id": "86",
  //     "name": "Advanced"
  //   },
  //   "services": [
  //     {
  //       "__typename": "DealerServiceOption",
  //       "code": "financing",
  //       "label": "Financiamento"
  //     },
  //     {
  //       "__typename": "DealerServiceOption",
  //       "code": "repair",
  //       "label": "Oficina"
  //     },
  //     {
  //       "__typename": "DealerServiceOption",
  //       "code": "car-wash",
  //       "label": "Lavagem"
  //     }
  //   ],
  //   "photos": {
  //     "__typename": "PhotosCollection",
  //     "totalCount": 5,
  //     "nodes": [
  //       {
  //         "__typename": "Image",
  //         "url": "https://ireland.apollo.olxcdn.com/v1/files/cgelmqqrz7gp-STDVTLPT/image;s=644x461"
  //       },
  //       {
  //         "__typename": "Image",
  //         "url": "https://ireland.apollo.olxcdn.com/v1/files/5gywsu56p3dv3-STDVTLPT/image;s=644x461"
  //       },
  //       {
  //         "__typename": "Image",
  //         "url": "https://ireland.apollo.olxcdn.com/v1/files/c5k8cg7xk5d81-STDVTLPT/image;s=644x461"
  //       },
  //       {
  //         "__typename": "Image",
  //         "url": "https://ireland.apollo.olxcdn.com/v1/files/2m4jdv5nu6x32-STDVTLPT/image;s=644x461"
  //       },
  //       {
  //         "__typename": "Image",
  //         "url": "https://ireland.apollo.olxcdn.com/v1/files/qj9308cqds633-STDVTLPT/image;s=644x461"
  //       }
  //     ]
  //   }
  // },

  // "seller": {
  //   "__typename": "ProfessionalSeller",
  //   "benefits": [
  //     "ADS_DURATION",
  //     "AUTOMATIC_AD_BUMPS",
  //     "PACKAGE_VALIDITY",
  //     "OLX_FEE_CARS",
  //     "OLX_FEE",
  //     "API_ACCESS",
  //     "DEALER_LOGO_IN_AD_PAGE",
  //     "SIMILAR_ADS",
  //     "MAP",
  //     "MORE_PHONES",
  //     "RELIABILITY_BADGE_TOOLTIP",
  //     "LINK_TO_DEALER_PAGE_IN_RESULTS",
  //     "LINK_TO_DEALER_PAGE_IN_AD_PAGE",
  //     "EXTERNAL_LINK",
  //     "DEALER_PAGE",
  //     "DEALER_LOGO_IN_RESULTS",
  //     "CALLTRACKING_WEEKLY_REPORT",
  //     "ADVERT_RANKING",
  //     "ADVERT_RANKING_PRICE_SORT",
  //     "PRICE_RECOMMENDATION",
  //     "CALLTRACKING",
  //     "VAS_SCHEDULE",
  //     "VAS_NOTIFICATION",
  //     "VAS_RECOMMENDATION",
  //     "OLX_VAS",
  //     "DEALER_IDENTITY_ELEMENTS",
  //     "SPECIAL_DEALER_IDENTITY_ELEMENTS_1",
  //     "BUYER_PROFILE",
  //     "AD_INSIGHTS",
  //     "STOCK_INSIGHTS",
  //     "DISCOUNT_PURCHASING_NUMERIC",
  //     "BUSINESS_SITE_PRO",
  //     "SOURCING_TOOL",
  //     "EARLY_ACCESS",
  //     "VELOCITY_METRICS_SELF",
  //     "VELOCITY_METRICS_MARKET",
  //     "REAL_TIME_CHAT",
  //     "AUCTIONS_BCA",
  //     "MULTI_USER",
  //     "ACCESS_CONTROL",
  //     "MARKET_DATA",
  //     "TOP_ADS",
  //     "APPRAISAL_TOOL",
  //     "PRICE_DROP_ADS",
  //     "SALESPERSON_PROFILE",
  //     "AUTOMATED_AD_DESCRIPTION",
  //     "IMAGE_TO_AD",
  //     "VIDEO_TO_AD",
  //     "AD_TO_VIDEO",
  //     "OLX_VAS_BUNDLE",
  //     "SALESPERSON_PHONE",
  //     "MAX_PICTURES",
  //     "MARKETVIEW",
  //     "AUTOMATIC_BUMP",
  //     "AD_TO_VIDEO",
  //     "VIDEO_TO_AD",
  //     "SALESPERSON_PHONE",
  //     "AUTOMATED_AD_DESCRIPTION",
  //     "APPRAISAL_TOOL",
  //     "IMAGE_TO_AD",
  //     "EARLY_ACCESS",
  //     "PRICE_DROP_ADS",
  //     "SALESPERSON_PROFILE",
  //     "MARKET_DATA",
  //     "BUYER_PROFILE",
  //     "SIMILAR_ADS",
  //     "BUSINESS_SITE_PRO",
  //     "AD_INSIGHTS",
  //     "STOCK_INSIGHTS",
  //     "CREDIT_INTERMEDIARY"
  //   ]
  // }