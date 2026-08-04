
const BASE_URL = 'https://www.standvirtual.com'
const API_SEARCH_URL = `${BASE_URL}/graphql`

export const CONFIG = {
  API_SEARCH_URL,
  BASE_URL,
  SELECTORS: {
    cookieBanner: {
      allowButton: '#onetrust-accept-btn-handler',
      banner: '#onetrust-banner-sdk',
    }
  }
}
