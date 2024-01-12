import { z } from 'zod'
import { ZDataTypesEnum } from '@/types/TDataTypes'

const ZGetPatchDeleteDataSchema = z.object({
  endpoint: ZDataTypesEnum,
  body: z.any().optional(),
  headers: z.any().optional(),
  id: z.string(),
})

type TGetPatchDeleteDataSchema = z.infer<typeof ZGetPatchDeleteDataSchema>

export function getData<T>(
  getDataSchema: TGetPatchDeleteDataSchema,
): Promise<T> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${getDataSchema.endpoint}/${getDataSchema.id}`,
    {
      method: 'GET',
      body: JSON.stringify(getDataSchema.body),
      headers: {
        'Content-Type': 'application/json',
        ...getDataSchema.headers,
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })
}

const ZGetAllDataSchema = z.object({
  endpoint: ZDataTypesEnum,
  body: z.any().optional(),
  headers: z.any().optional(),
})

type TGetAllDataSchema = z.infer<typeof ZGetAllDataSchema>

export function getAllData<T>(getDataSchema: TGetAllDataSchema): Promise<T> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${getDataSchema.endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getDataSchema.headers,
    },
  })
    .then((res) => res.json() as Promise<T>)
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })
}

export function getAllDataPost<T>(
  getDataSchema: TGetAllDataSchema,
): Promise<T> {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${getDataSchema.endpoint}`,
    {
      method: 'POST',
      body: JSON.stringify(getDataSchema.body),
      headers: {
        'Content-Type': 'application/json',
        ...getDataSchema.headers,
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })

  return response
}

export function patchData<T>(
  patchDataSchema: TGetPatchDeleteDataSchema,
): Promise<T> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${patchDataSchema.endpoint}/${patchDataSchema.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(patchDataSchema.body),
      headers: patchDataSchema.headers,
    },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })
}

export function deleteData<T>(
  deleteDataSchema: TGetPatchDeleteDataSchema,
): Promise<T> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${deleteDataSchema.endpoint}/${deleteDataSchema.id}`,
    {
      method: 'DELETE',
      body: JSON.stringify(deleteDataSchema.body),
      headers: deleteDataSchema.headers,
    },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })
}
