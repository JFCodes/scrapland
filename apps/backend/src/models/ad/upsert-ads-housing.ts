import { type T_Ad_Housing_Insert, DBSchema_Ad_Housing } from '@scrapland/data-model'
// App
import { excluded } from '../../database/utils'
import { db } from '../../database'

export async function upsertAdsHousing (ads: Array<T_Ad_Housing_Insert>): Promise<void> {
  if (ads.length === 0) return

  await db.insert(DBSchema_Ad_Housing)
    .values(ads)
    .onConflictDoUpdate({
      target: DBSchema_Ad_Housing._ad_targetAndId,
      set: {
        active: excluded(DBSchema_Ad_Housing.active),
        descriptionShort: excluded(DBSchema_Ad_Housing.descriptionShort),
        constructionYear: excluded(DBSchema_Ad_Housing.constructionYear),
        price: excluded(DBSchema_Ad_Housing.price),
        url: excluded(DBSchema_Ad_Housing.url),
        areaBuilt: excluded(DBSchema_Ad_Housing.areaBuilt),
        areaLiving: excluded(DBSchema_Ad_Housing.areaLiving),
        areaTotal: excluded(DBSchema_Ad_Housing.areaTotal),
        locationIsExact: excluded(DBSchema_Ad_Housing.locationIsExact),
        locationLocalZone: excluded(DBSchema_Ad_Housing.locationLocalZone),
        locationZipCode: excluded(DBSchema_Ad_Housing.locationZipCode),
        locationAddress: excluded(DBSchema_Ad_Housing.locationAddress),
        locationRegion: excluded(DBSchema_Ad_Housing.locationRegion),
        locationLongitude: excluded(DBSchema_Ad_Housing.locationLongitude),
        locationLatitude: excluded(DBSchema_Ad_Housing.locationLatitude),
        typologyHasParking: excluded(DBSchema_Ad_Housing.typologyHasParking),
        typologyHasGarage: excluded(DBSchema_Ad_Housing.typologyHasGarage),
        typologyBedrooms: excluded(DBSchema_Ad_Housing.typologyBedrooms),
        typologyBathrooms: excluded(DBSchema_Ad_Housing.typologyBathrooms),
        typologyOtherRooms: excluded(DBSchema_Ad_Housing.typologyOtherRooms),
        typologyTotalRooms: excluded(DBSchema_Ad_Housing.typologyTotalRooms),
        typologyParkingSpots: excluded(DBSchema_Ad_Housing.typologyParkingSpots),
        contactAgencyContact: excluded(DBSchema_Ad_Housing.contactAgencyContact),
        contactAgencyName: excluded(DBSchema_Ad_Housing.contactAgencyName),
        contactUserContact: excluded(DBSchema_Ad_Housing.contactUserContact),
        contactUsername: excluded(DBSchema_Ad_Housing.contactUsername),
        images: excluded(DBSchema_Ad_Housing.images),
        imageMain: excluded(DBSchema_Ad_Housing.imageMain),
      }
    })
}
