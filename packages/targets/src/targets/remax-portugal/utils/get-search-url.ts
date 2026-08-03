import type {
  T_Task_Ad_Housing_FindNew,
  T_Ad_Housing_BuildingType,
  T_Ad_Housing_Operation,
} from '@scrapland/data-model'
// App
import { CONFIG } from '../config'

const { BASE_URL } = CONFIG

export function getSearchUrl (task: T_Task_Ad_Housing_FindNew): string {
  if (!task.operation) throw Error('Task must provide operation type')
  if (!task.buildingTypes || task.buildingTypes.length === 0) throw Error('Task must provide at least one building type.')

  let url = BASE_URL
  url += `/${getPostingOperationSegment(task.operation)}`
  url += '/imoveis'
  url += `/${getPostingTypesSegment(task.buildingTypes)}`

  if (task.location) url += `/${task.location}`
  url += getCommaSeparatedFields(task)

  return url
}

function getPostingOperationSegment (operation: T_Ad_Housing_Operation): string {
  switch (operation) {
    case 'rent': return 'arrendar'
    case 'buy': return 'comprar'
  }
}

function getCommaSeparatedFields (task: T_Task_Ad_Housing_FindNew): string {
  const fields: Array<string> = []

  // TODO: nr rooms segment is always before price
  // event without it, we need to inject `t`
  fields.push('t')

  // Price field
  if (task._price_min || task._price_max) {
    let priceSegment = 'preco_'
    if (task._price_min) priceSegment += String(task._price_min)
    if (task._price_max) priceSegment += `_${task._price_max}`
    fields.push(priceSegment)
  }

  if (fields.length === 0) return ''

  return `/${fields.join(',')}`
}


function getPostingTypesSegment (types: Array<T_Ad_Housing_BuildingType>): string {
  if (types.length === 0) return `habitacao`

  const mapTypology = (typology: T_Ad_Housing_BuildingType): string => {
    switch (typology) {
      case 'single-house': return 'moradia'
      case 'apartment': return 'apartamento'
    }
  }

  return types.map(mapTypology).join(',')
}