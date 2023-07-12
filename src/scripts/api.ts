import * as misskey from 'misskey-js'
import { Endpoints } from 'misskey-js/built/api.types'

import { url } from '@/core/config'
import { TOKEN } from '@/../env'

const client = new misskey.api.APIClient({
  origin: url,
  credential: TOKEN
})

export const apiGet = async <E extends keyof Endpoints, P extends Endpoints[E]['req']>(
  endpoint: E,
  params?: P
  // credential?: string | null | undefined
) => {
  return await client.request(endpoint, params).then(data => {
    return data
  })
}

//emoji api URL: https://misskey.io/api/emojis
