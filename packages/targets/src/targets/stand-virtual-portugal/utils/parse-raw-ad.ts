import { T_Ad_Vehicle_Insert, T_Ad_Vehicle_PricePosition, T_Task_Ad_Vehicle_FindNew } from '@scrapland/data-model'
import { F_AD_GetTargetAndAdIds } from '@scrapland/functions'
// App
import type {
  GraphqlListingEdgeParameterKey,
  GraphqlListingEdgeParameter,
  GraphqlListingEdge
} from '../types/edge'

export function parseRawAd (
  task: T_Task_Ad_Vehicle_FindNew,
  rawAd: GraphqlListingEdge
): T_Ad_Vehicle_Insert {

  const parametersMap = new Map<GraphqlListingEdgeParameterKey, GraphqlListingEdgeParameter>()
  rawAd.parameters.forEach(p => parametersMap.set(p.key, p))

  const yearParameter = parametersMap.get('first_registration_year')
  const engineSizeParameter = parametersMap.get('engine_capacity')
  const enginePowerParameter = parametersMap.get('engine_power')
  const fuelTypeParameter = parametersMap.get('fuel_type')
  const gearboxParameter = parametersMap.get('gearbox')
  const versionParameter = parametersMap.get('version')
  const mileageParameter = parametersMap.get('mileage')
  const modelParameter = parametersMap.get('model')
  const brandParameter = parametersMap.get('make')

  const images: Array<string> = []
  if (rawAd.thumbnail.x1) images.push(rawAd.thumbnail.x1)
  if (rawAd.thumbnail.x2) images.push(rawAd.thumbnail.x2)

  return {
    // Ad base schema fields
    ...F_AD_GetTargetAndAdIds(task._task_target, rawAd.id),
    _ad_proposalBid: null,
    _ad_taskId: task._id,
    _ad_notes: null,
    // META fields
    _ad_vehicle_brand: task.brand,
    _ad_vehicle_model: task.model,
    // Proper ad fields
    pricePosition: getPricePosition(rawAd.priceEvaluation),
    enginePower: enginePowerParameter?.displayValue ?? null,
    engineSize: engineSizeParameter?.displayValue ?? null,
    sellerWebsite: rawAd.sellerLink?.websiteUrl ?? null,
    fuelType: fuelTypeParameter?.displayValue ?? null,
    gearbox: gearboxParameter?.displayValue ?? null,
    version: versionParameter?.displayValue ?? null,
    mileage: mileageParameter?.displayValue ?? null,
    brand: brandParameter?.displayValue ?? null,
    model: modelParameter?.displayValue ?? null,
    year: yearParameter?.displayValue ?? null,
    sellerName: rawAd.sellerLink.name,
    price: rawAd.price.amount.units,
    title: rawAd.shortDescription,
    url: rawAd.url,
    images,
  }
}

function getPricePosition (evaluation: GraphqlListingEdge['priceEvaluation']): T_Ad_Vehicle_PricePosition {
  switch (evaluation.indicator) {
    case 'ABOVE': return 'above'
    case 'BELOW': return 'below'
    case 'IN': return 'average'
  }
}
