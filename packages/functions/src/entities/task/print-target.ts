import { E_TARGET } from '@scrapland/data-model'

export function F_Entity_Task_PrintTarget (target: E_TARGET): string {
  return target.replaceAll('-', ' ').toUpperCase()
}
