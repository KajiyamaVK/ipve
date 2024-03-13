import { FastifyReply } from 'fastify'
import { ZodRawShape, z } from 'zod'

interface IResponse<T> {
  data?: T
  res: FastifyReply
  statusCode?: number
  message?: string
}

interface IHandleError {
  err: Error
  res: FastifyReply
}

export function handleError({ err, res }: IHandleError) {
  console.error(err)
  return res.status(500).send({ message: err })
}

export function sendResponse<T>({ data, res, statusCode = 200 }: IResponse<T>) {
  return res.status(statusCode).send(data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runQuery<T>(query: string, mysql: any, params?: any[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    mysql.query(query, params, (err: Error, results: T[]) => {
      if (err) {
        console.error('error', err)
        reject(err)
      }
      resolve(results)
    })
  })
}

interface IValidateBody {
  isOk: boolean
  message: string
}

export function validateBody<T>(body: T, schema: ZodRawShape): IValidateBody {
  const parsedBody = z.object(schema).safeParse(body)
  if (!parsedBody.success) {
    return {
      isOk: false,
      message: parsedBody.error.errors[0].message,
    }
  }

  return {
    isOk: true,
    message: '',
  }
}
