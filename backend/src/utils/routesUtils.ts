import { FastifyReply } from 'fastify'
import { saveInfraLog } from './infraUtils'

interface IResponse<T> {
  data: T
  res: FastifyReply
  statusCode: number
  message?: string
  idPeople: number
}

export function sendResponse<T>({ data, res, statusCode, idPeople, message }: IResponse<T>) {
  if (statusCode >= 400) {
    res.status(500).send({ message })
    if (message) saveInfraLog({ message, idPeople })
  }
  return res.status(statusCode).send(data)
}
