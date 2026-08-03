const BASE_URL = 'https://www.imovirtual.com/pt'
const BASE_API_URL = 'https://www.imovirtual.com'

export const CONFIG = {
  BASE_API_URL,
  BASE_URL,
  SELECTORS: {
    cookieBanner: {
      allowButton: '#onetrust-accept-btn-handler',
      banner: '#onetrust-banner-sdk',
    },
    scripts: {
      offersData: 'head script[data-ot-ignore][data-next-head]',
      build: 'script#__NEXT_DATA__',
    },
  }
}
