import { E_EXECUTION_STATUS } from './enums'

export type T_Execution_StatusHistory = {
  status: E_EXECUTION_STATUS,
  date: number
}

export type T_Execution_Summary = {
  newAdsCount: number
  updatedAdsCount: number
}
