import { T_Ad_Housing_Insert, T_Task_Ad_Housing_FindNew } from '@scrapland/data-model'
import { F_AD_GetTargetAndAdIds } from '@scrapland/functions'
// App
import { CONFIG } from '../config'
import type { PostingSearchItem } from '../types'

const { BASE_URL } = CONFIG

const getUrl = (href: string): string => {
  const withLang = href
    .replace('[lang]', '')
    .replace('/ad/', '/anuncio/')
  return `${BASE_URL}/${withLang}`
}

const getRoomsNumber = (stringValue: string): number => {
  switch (stringValue) {
    case 'ONE': return 1
    case 'TWO': return 2
    case 'THREE': return 3
    case 'FOUR': return 4
    case 'FIVE': return 5
    case 'SIX': return 6
    case 'SEVEN': return 7
    case 'EIGHT': return 8
    case 'NINE': return 8
    case 'TEN': return 10
    case 'ELEVEN': return 11
    case 'TWELVE': return 12
    case 'THIRTEEN': return 13
    case 'FOURTEEN': return 14
    case 'FIFTEEN': return 15
    case 'SIXTEEN': return 16
    case 'SEVENTEEN': return 17
    case 'EIGHTEEN': return 18
    case 'NINETEEN': return 19
    case 'TWENTY': return 20
    case 'MORE':
    default: return 0
  }
}

export function ParseRawAd (
  task: T_Task_Ad_Housing_FindNew,
  rawAd: PostingSearchItem
): T_Ad_Housing_Insert {

  const { advertOwner, agency, location } = rawAd
  const { city, province, street } = location.address

  const streetOrEmpty = street?.name ?? ''
  const hasZipCode = streetOrEmpty.length === 8 && streetOrEmpty[4] === '-' 
  const region = `${city.name} ${province.name}`
  const bedrooms = getRoomsNumber(rawAd.roomsNumber)


  return {
    ...F_AD_GetTargetAndAdIds(task._task_target, rawAd.id),
    // Ad base schema fields
    _ad_proposalBid: null,
    _ad_taskId: task._id,
    _ad_notes: null,
    // META fields
    _ad_housing_buildingTypes: task.buildingTypes ?? [],
    _ad_housing_operation: task.operation!, // This is already guarded in execution
    // Actual ad fields - Only fields to update on upsert
    active: true,
    descriptionShort: rawAd.title,
    constructionYear: null, 
    price: rawAd.totalPrice?.value ?? 0, // TODO: Find if we can get this one
    url: getUrl(rawAd.href),
    // Area
    areaTotal: rawAd.terrainAreaInSquareMeters || rawAd.areaInSquareMeters,
    areaLiving: rawAd.areaInSquareMeters,
    areaBuilt: rawAd.terrainAreaInSquareMeters,
    // Location
    locationAddress: `${street?.name ?? ''} ${street?.number ?? ''}`.trim(),
    locationZipCode: hasZipCode ? streetOrEmpty : '',
    locationLongitude: null,
    locationLatitude: null,
    locationRegion: region,
    locationIsExact: false,
    locationLocalZone: '',
    // Typology
    typologyTotalRooms: bedrooms,
    typologyBedrooms: bedrooms,
    typologyParkingSpots: null,
    typologyHasParking: null,
    typologyOtherRooms: null,
    typologyHasGarage: null,
    typologyBathrooms: null,
    // Contacts
    contactUserContact: advertOwner.contacts[0] ?? '',
    contactUsername: advertOwner.name ?? '',
    contactAgencyName: agency?.name ?? '',
    contactAgencyContact: '',
    // Images
    imageMain: rawAd.images[0]?.large ?? null,
    images: rawAd.images.map(i => i.large),
  }
}
