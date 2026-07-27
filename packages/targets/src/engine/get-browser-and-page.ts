import { chromium, type Browser, type Page } from 'playwright'

export async function GetBrowserAndPage (): Promise<{ browser: Browser, page: Page }> {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage({ viewport: { height: 1200, width: 1900 } })

  return { browser, page }
}
