
const BASE_URL = 'https://remax.pt/pt'
const BASE_API_URL = 'https://remax.pt'
export const BASE_IMAGE_URL = 'https://i.maxwork.pt/l-feat'

const API_SEARCH_PATH = 'api/Listing/PaginatedMultiMatchSearch'
const API_SEARCH = `${BASE_API_URL}/${API_SEARCH_PATH}`

export const CONFIG = {
  API_SEARCH_PATH,
  API_SEARCH,
  BASE_URL,
  BASE_IMAGE_URL,
  SELECTORS: {
    cookieBanner: {
      allowButton: '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection',
      banner: '#CybotCookiebotDialog',
    }
  }
}
