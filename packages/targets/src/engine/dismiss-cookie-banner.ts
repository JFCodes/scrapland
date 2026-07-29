import type { Page } from 'playwright'

type Options = {
  bannerButtonSelection: string
  bannerSelector: string
}

export async function DismissCookieBanner (page: Page, options: Options): Promise<void> {
  const { bannerButtonSelection, bannerSelector } = options

  // Handle cookies banner
  const banner = page.locator(bannerSelector)

  if (await banner.isVisible()) {
    const button = banner.locator(bannerButtonSelection)

    await button.waitFor({ state: 'visible' })
    await button.click()
    await banner.waitFor({ state: 'hidden' })
  }
}