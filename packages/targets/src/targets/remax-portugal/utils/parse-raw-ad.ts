import { T_Ad_Housing_Insert, T_Task_Ad_Housing_FindNew } from '@scrapland/data-model'
import { F_AD_GetTargetAndAdIds } from '@scrapland/functions'
// App
import { RawAd } from '../types'
import { CONFIG } from '../config'

const { BASE_IMAGE_URL, BASE_URL } = CONFIG

const withImageBaseUrl = (url: string) => `${BASE_IMAGE_URL}/${url}` 

export function parseRawAd (
  task: T_Task_Ad_Housing_FindNew,
  rawAd: RawAd
): T_Ad_Housing_Insert {

  const { numberOfBathrooms, numberOfBedrooms } = rawAd
  const bedAndBathRooms = numberOfBathrooms + numberOfBedrooms
  const totalRooms = rawAd.totalRooms ?? bedAndBathRooms
  const otherRooms = Math.max(0, totalRooms - bedAndBathRooms)

  const region = [
    rawAd.regionName1 || '',
    rawAd.regionName2 || '',
    rawAd.regionName3 || '',
  ].filter(r => !!r).join(', ').trim()

  return {
    // Ad base schema fields
    ...F_AD_GetTargetAndAdIds(task._task_target, rawAd.id),
    _ad_proposalBid: null,
    _ad_taskId: task._id,
    _ad_notes: null,
    // META fields
    _ad_housing_buildingTypes: task.buildingTypes ?? [],
    _ad_housing_operation: task.operation!, // This is already guarded in execution
    // Actual ad fields - Only fields to update on upsert
    active: true,
    descriptionShort: rawAd.descriptionTags,
    constructionYear: rawAd.constructionYear,
    price: rawAd.listingPrice,
    url: `${BASE_URL}/imoveis/${rawAd.descriptionTags}/${rawAd.listingTitle}`,
    // Area
    areaLiving: rawAd.livingArea,
    areaTotal: rawAd.totalArea,
    areaBuilt: rawAd.builtArea,
    // Location
    locationIsExact: rawAd.isExactAddress,
    locationLongitude: rawAd.longitude,
    locationLocalZone: rawAd.localZone,
    locationLatitude: rawAd.latitude,
    locationZipCode: rawAd.zipCode,
    locationAddress: rawAd.address,
    locationRegion: region,
    // Typology
    typologyBedrooms: rawAd.numberOfBedrooms,
    typologyBathrooms: rawAd.numberOfBathrooms,
    typologyParkingSpots: rawAd.garageSpots,
    typologyHasParking: rawAd.parking,
    typologyHasGarage: rawAd.garage,
    typologyTotalRooms: totalRooms,
    typologyOtherRooms: otherRooms,
    // Contacts
    contactAgencyContact: rawAd.userAgencyPhoneNumber,
    contactUserContact: rawAd.userCellPhoneTrimmed,
    contactAgencyName: rawAd.userAgencyName || '',
    contactUsername: rawAd.userName,
    // Images
    images: rawAd.listingPictures.map(withImageBaseUrl),
    imageMain: withImageBaseUrl(rawAd.listingPictureUrl),
  }
}
