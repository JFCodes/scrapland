import { E_RUN_OUTCOME_ERROR_TYPE, E_RUN_OUTCOME_RESULT } from './enums'
import type { T_Ad_Housing_Insert, T_Ad_Vehicle_Insert } from '../index'

export type T_RunOutcomeBase<Data> = {
  result: E_RUN_OUTCOME_RESULT
  ended: null | number
  started: number
  data: Data
  error?: {
    type: E_RUN_OUTCOME_ERROR_TYPE
    stack?: Array<string>
    details: string
  }
}

export type T_RunOutcome_Ad_Housing_FindNew = T_RunOutcomeBase<{ ads: Array<T_Ad_Housing_Insert> }>
export type T_RunOutcome_Ad_Vehicle_FindNew = T_RunOutcomeBase<{ ads: Array<T_Ad_Vehicle_Insert> }>

export type T_RunOutcome = 
  | T_RunOutcome_Ad_Housing_FindNew
  | T_RunOutcome_Ad_Vehicle_FindNew
  
