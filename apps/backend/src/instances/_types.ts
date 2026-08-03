import { T_Execution_Summary, T_RunOutcome } from "@scrapland/data-model"

export type ExecutionOutcomeAndSummary = {
  summary: T_Execution_Summary,
  outcome: T_RunOutcome,
}
