
/*
  Forked from https://github.com/vercel/commerce/tree/main/packages/saleor/src
  Changes: 
    - Before: The saleor_api_url was defined at build time. 
      So this file just implemented a fetcher with these parameters defined.
    - Now: The saleor_api_url is defined at runtime. 
      So we have to get the fetcher using these parameters.
*/

import { Fetcher } from '@plasmicpkgs/commerce'
import { getToken, handleFetchResponse } from './utils'

export const getFetcher:
  (saleor_api_url: string) => Fetcher =
  (saleor_api_url) => {
    return async ({
      url = `${saleor_api_url}`,
      method = 'POST',
      variables,
      query,
    }) => {
      const token = getToken()
      return handleFetchResponse(
        await fetch(url!, {
          method,
          body: JSON.stringify({ query, variables }),
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
      )
    }
  }


