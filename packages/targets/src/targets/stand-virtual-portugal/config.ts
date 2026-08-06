
const BASE_URL = 'https://www.standvirtual.com'
const API_SEARCH_URL = `${BASE_URL}/graphql`

export const CONFIG = {
  API_SEARCH_URL,
  BASE_URL: `${BASE_URL}/carros`,
  SELECTORS: {
    cookieBanner: {
      allowButton: '#onetrust-accept-btn-handler',
      banner: '#onetrust-banner-sdk',
    },
    filters: {
      brandFilter: 'input[placeholder="Marca"][data-rac]',
      option: '[role="option"][data-key="mercedes-benz"]',
    }
  }
}
