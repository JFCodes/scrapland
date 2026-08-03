import { Page } from 'playwright'
// App
import { CONFIG } from '..'

type BuildScriptData = {
  buildId: string
}

export async function GetBuildId (page: Page): Promise<string> {
  const locator = page.locator(CONFIG.SELECTORS.scripts.build)
  const content = await locator.innerText()

  try {
    const data = JSON.parse(content) as BuildScriptData
    return data.buildId
  } catch (error) {
    throw error
  }
}
