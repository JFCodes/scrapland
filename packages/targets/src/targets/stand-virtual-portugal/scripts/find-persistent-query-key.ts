import { Page } from 'playwright'
// App
import { CONFIG } from '..'

export async function FindPersistentQueryKey (page: Page): Promise<string> {
  console.log('FindPersistentQueryKey')
  return ''
  // const locator = page.locator(CONFIG.SELECTORS.scripts.build)
  // const content = await locator.innerText()

  // try {
  //   const data = JSON.parse(content) as BuildScriptData
  //   return data.buildId
  // } catch (error) {
  //   throw error
  // }
}
