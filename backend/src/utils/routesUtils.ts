import { FastifyReply } from 'fastify'

interface IResponse<T> {
  data: T
  res: FastifyReply
  statusCode: number
  message?: string
}

interface IHandleError {
  err: Error
  res: FastifyReply
}

export function handleError({ err, res }: IHandleError) {
  return res.status(500).send({ message: err.message })
}

export function sendResponse<T>({ data, res }: IResponse<T>) {
  console.log('data', data)
  return res.status(201).send(data)
}
