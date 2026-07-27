import type { T_Ad_Housing, T_Task_Ad_Housing_FindNew } from "@scrapland/data-model"

export type OverLayExposed = { closePanel: () => void }

export type PanelTaskHousingEditCreateProps = {
  task: T_Task_Ad_Housing_FindNew
}

export type PanelAdHousingProps = {
  housingAd: T_Ad_Housing
}
