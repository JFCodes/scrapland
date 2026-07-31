export type T_Ad_Housing_BuildingType =
  | 'apartment'
  | 'single-house'

// For validation functions we need a const of all value
export const CONST_T_AD_HOUSING_BUILDING_TYPE: Array<T_Ad_Housing_BuildingType> = [
  'single-house',
  'apartment'
] as const

export type T_Ad_Housing_Operation =
  | 'rent'
  | 'buy'

export const CONST_T_AD_HOUSING_OPERATION: Array<T_Ad_Housing_Operation> = [
  'rent',
  'buy'
] as const

