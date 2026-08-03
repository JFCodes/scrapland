import type {
  T_Task_Ad_Housing_FindNew,
  T_Ad_Housing_BuildingType,
  T_Ad_Housing_Operation,
} from '@scrapland/data-model'
// App
import { CONFIG } from '..'

type Options = {
  pageNumber: number
  buildId: string
}

export function GetApiSearchUrl (task: T_Task_Ad_Housing_FindNew, options: Options): string {
  if (!task.buildingTypes || task.buildingTypes.length === 0) throw Error('Task must provide at least one building type.')
  if (!task.operation) throw Error('Task must provide operation type')

  const { buildId, pageNumber } = options
  const adOperation = getAddTypeSegment(task.operation)
  const adType = getAddBuildingTypeSegment(task.buildingTypes)

  let url = CONFIG.BASE_API_URL
  url += '/_next/data'
  url += `/${buildId}`
  url += '/pt/resultados'
  url += `/${adOperation}`
  url += `/${adType}`
  url += `/${task.location}.json`
  url += '?limit=72'
  url += `&page=${pageNumber}`
  url += `&searchingCriteria=${adOperation}`
  url += `&searchingCriteria=${adType}`
  url += task.location.split('/').map(l => `&searchingCriteria=${l}`).join('')

  return url
}


function getAddTypeSegment (addType: T_Ad_Housing_Operation): string {
  switch (addType) {
    case 'rent': return 'arrendar'
    case 'buy': return 'comprar'
  }
}

function getAddBuildingTypeSegment (types: Array<T_Ad_Housing_BuildingType>): string {
  if (types.length === 0) throw new Error('Imovirtual requires one ad type segment')

  const mapTypology = (typology: T_Ad_Housing_BuildingType): string => {
    switch (typology) {
      case 'single-house': return 'moradia'
      case 'apartment': return 'apartamento'
    }
  }

  return types.map(mapTypology).join(',')
}
