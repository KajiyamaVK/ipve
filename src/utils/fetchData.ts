import { z } from 'zod'
import { ZDataTypesEnum } from '@/types/TDataTypes'
import { endpointsPaths } from '@/data/endpointsPaths'
import { toast } from '@/components/ui/use-toast'

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
    case 'kinsRelations':
      return endpointsPaths.kinsRelations
    case 'locations':
      return endpointsPaths.locations
    default:
      throw new Error('Endpoint not found')
  }
}

export function getData<T>({ endpoint, body, headers, id }: TGetPatchDeleteDataSchema): Promise<T> {
  const methodType = body ? 'POST' : 'GET'

  const commonProperties = {
    method: methodType,
    cache: 'no-cache' as RequestCache,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  const fetchParams = methodType === 'POST' ? { body: JSON.stringify(body), ...commonProperties } : commonProperties

  return fetch(`${getEndPointsUrl(endpoint)}${id ? '/' + id : ''}`, fetchParams)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => JSON.parse(JSON.stringify(data))) // Assegura que os dados sejam objetos JavaScript simples
    .catch((error) => {
      console.error(error.message) // Logs the error
      // Exibe um erro de maneira adequada, conforme necessário, pode ser um toast ou outra maneira
      toast({
        type: 'background',
        description: `Evento não esperado. Entre em contato com o suporte: "${error.message}"`,
        variant: 'destructive',
      })
      // É importante que erros retornem algo que seja serializável, por exemplo, um objeto de erro simples
      return { error: true, message: error.message }
    })
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
      if ([400, 500].includes(response.status)) {
        throw new Error(response.statusText)
      }
      return response.json() as T
    })
    .catch((err) => {
      alert(`Entre em contato com o suporte: ${err.message}`)
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
