import {
  DBSchema_Ad_Vehicle,
  type T_Ad_Vehicle_Insert,
  type T_Execution_Summary
} from '@scrapland/data-model'
// App
import { excluded } from '../../database/utils'
import { db } from '../../database'

export async function upsertAdsVehicle (ads: Array<T_Ad_Vehicle_Insert>): Promise<T_Execution_Summary> {
  if (ads.length === 0) return { updatedAdsCount: 0, newAdsCount: 0 }

  const allAds = db.select().from(DBSchema_Ad_Vehicle).all()
  const toUpsertAds = new Set(ads.map(ad => ad._ad_targetAndId))
  const updatedAds = new Set<string>()

  allAds.forEach(ad => {
    const checkId = ad._ad_targetAndId

    if (!toUpsertAds.has(checkId)) return
    toUpsertAds.delete(checkId)
    updatedAds.add(checkId)
  })

  await db.insert(DBSchema_Ad_Vehicle)
    .values(ads)
    .onConflictDoUpdate({
      target: DBSchema_Ad_Vehicle._ad_targetAndId,
      set: {
        pricePosition: excluded(DBSchema_Ad_Vehicle.pricePosition),
        sellerWebsite: excluded(DBSchema_Ad_Vehicle.sellerWebsite),
        enginePower: excluded(DBSchema_Ad_Vehicle.enginePower),
        engineSize: excluded(DBSchema_Ad_Vehicle.engineSize),
        sellerName: excluded(DBSchema_Ad_Vehicle.sellerName),
        fuelType: excluded(DBSchema_Ad_Vehicle.fuelType),
        gearbox: excluded(DBSchema_Ad_Vehicle.gearbox),
        version: excluded(DBSchema_Ad_Vehicle.version),
        mileage: excluded(DBSchema_Ad_Vehicle.mileage),
        images: excluded(DBSchema_Ad_Vehicle.images),
        brand: excluded(DBSchema_Ad_Vehicle.brand),
        model: excluded(DBSchema_Ad_Vehicle.model),
        year: excluded(DBSchema_Ad_Vehicle.year),
        url: excluded(DBSchema_Ad_Vehicle.url),
      }
    })

  return {
    updatedAdsCount: updatedAds.size,
    newAdsCount: toUpsertAds.size,
  }
}
