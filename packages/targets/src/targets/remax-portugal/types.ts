export type RawAd = {
  id: number
  isActive: boolean
  constructionYear: number
  listingPrice: number
  descriptionTags: string // used to construct url
  listingTitle: string // used to construct url
  // User related
  userName: string
  userAgencyPhoneNumber: string
  userCellPhoneTrimmed: string
  userAgencyName: null | string
  // Location related
  isExactAddress: boolean
  longitude: number
  latitude: number
  localZone: string
  zipCode: string
  address: string
  regionName1: string
  regionName2: string
  regionName3: string
  // Areas
  totalArea: number
  livingArea: number
  builtArea: null | number
  // Typology
  numberOfBedrooms: number
  numberOfBathrooms: number
  totalRooms: null | number
  parking: boolean
  garage: boolean
  garageSpots: number
  // Images
  listingPictureUrl: string
  listingPictures: Array<string>
}

export type MultiSearchPaginatedPayload = {
  filters: Array<unknown>
  searchValue: string
  sort: Array<string>
  pageNumber: number
  pageSize: number
}

export type MultiSearchPaginated = {
  results: Array<RawAd>
  hasNextPage: number
  totalPages: number
  pageSize: number
  total: number
}
