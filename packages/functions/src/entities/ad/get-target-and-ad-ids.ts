import { E_TARGET } from '@scrapland/data-model'

type ResultType = {
  _ad_targetAndId: string
  _ad_targetId: string
  _ad_target: E_TARGET
}

export function F_AD_GetTargetAndAdIds (target: E_TARGET, targetId: string | number): ResultType {
  return {
    _ad_targetAndId: `${target}-${targetId}`,
    _ad_targetId: String(targetId),
    _ad_target: target
  }
}
