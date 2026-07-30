import type { T_Ad_Housing, T_Task, T_Task_Ad_Housing_FindNew } from "@scrapland/data-model"

export type OverLayExposed = { closePanel: () => void }

export type PanelTaskHousingEditCreateProps = { task: T_Task_Ad_Housing_FindNew }
export type PanelExecutionsTaskLatestExecutions = { task: T_Task }
export type PanelAdHousingProps = { housingAd: T_Ad_Housing }
