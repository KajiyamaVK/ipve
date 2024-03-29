import { z } from 'zod'
import { ZDataTypesEnum } from '@/types/TDataTypes'
import { endpointsPaths } from '@/data/endpointsPaths'

const ZGetPatchDeleteDataSchema = z.object({
  endpoint: ZDataTypesEnum,
  body: z.any().optional().default(false),
  headers: z.any().optional(),
  id: z.number().optional(),
  tag: z.string().optional(),
  revalidate: z.number().optional(),
  isCaching: z.boolean().optional(),
})

export type TGetPatchDeleteDataSchema = z.infer<typeof ZGetPatchDeleteDataSchema>

function getEndPointsUrl(endpoint: string): string | URL | Request {
  switch (endpoint) {
    case 'people':
      return endpointsPaths.people
    case 'roles':
      return endpointsPaths.roles
    case 'titles':
      return endpointsPaths.titles
    case 'generalRoutes':
      return endpointsPaths.generalRoutes
    case 'kinsRelations':
      return endpointsPaths.kinsRelations
    default:
      throw new Error('Endpoint not found')
  }
}

export function getData<T>({ endpoint, body, headers, id, isCaching = false }: TGetPatchDeleteDataSchema): Promise<T> {
  const methodType = body ? 'POST' : 'GET'
  const cacheValue: RequestCache = isCaching ? 'default' : 'no-cache'

  const commonProperties = {
    method: methodType,
    cache: cacheValue,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  const fetchParams =
    methodType === 'POST' ? { body: JSON.stringify(body), ...commonProperties } : { ...commonProperties }

  const data = fetch(`${getEndPointsUrl(endpoint)}${id ? '/' + id : ''}`, fetchParams)
    .then((res) => res.json() as T)
    .catch((err) => {
      console.error(err.message)
      throw new Error(err.message)
    })

  return data
}

export function saveData<T>({ endpoint, body, headers, id }: TGetPatchDeleteDataSchema): Promise<T | void> {
  return fetch(`${getEndPointsUrl(endpoint)}${id ? '/' + id : ''}`, {
    method: `${id ? 'PUT' : 'POST'}`,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json() as T
      }
      if ([400, 500].includes(response.status)) {
        throw new Error(response.statusText)
      }
    })
    .catch((err) => {
      console.error(err)
      alert(`Entre em contato com o suporte: Check the console for more details.`)
    })
}

export function deleteData({ id, headers, endpoint }: TGetPatchDeleteDataSchema): Promise<boolean> {
  return fetch(`${getEndPointsUrl(endpoint)}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })
}
