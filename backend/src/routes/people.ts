import { PrismaClient } from '@prisma/client'
import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import { IRoles, TPeople } from '../types/people'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

export async function people(app: FastifyInstance) {
  const prisma = new PrismaClient()

  // Abstract error handling into a separate function
  function handleError(err: FastifyError, res: FastifyReply) {
    return res.status(500).send({ message: err })
  }

  // Abstract response sending into a separate function
  function sendResponse<T>(data: T, res: FastifyReply, statusCode = 200) {
    return res.status(statusCode).send(data)
  }

  app.get('/roles', async (req: FastifyRequest, res: FastifyReply) => {
    await prisma.peopleRoles
      .findMany()
      .then((data) => {
        sendResponse(data, res)
      })
      .catch((err: FastifyError) => {
        handleError(err, res)
      })
  })

  app.get('/roles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)

    await prisma.peopleRoles
      .findUnique({
        where: {
          id,
        },
      })
      .then((data) => {
        sendResponse(data, res)
      })
      .catch((err: FastifyError) => {
        handleError(err, res)
      })
  })

  app.post('/roles', async (req: FastifyRequest, res: FastifyReply) => {
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

    const { id, name, tailwindColor, description } = req.body as IRoles

    prisma.peopleRoles
      .create({
        data: {
          id,
          name,
          tailwindColor,
          description,
        },
      })
      .then((data) => {
        sendResponse(data, res, 201)
      })
  })

  app.post('/roles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

    const { name, tailwindColor, description } = req.body as IRoles

    const data = await prisma.peopleRoles.update({
      where: {
        id,
      },
      data: {
        name,
        tailwindColor,
        description,
      },
    })

    sendResponse(data, res, 200)
  })

  app.delete('/roles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)

    await prisma.peopleRoles.delete({
      where: {
        id,
      },
    })
    sendResponse({ message: 'Deleted' }, res, 200)
  })

  app.get('/titles', async (req: FastifyRequest, res: FastifyReply) => {
    await prisma.peopleTitles
      .findMany()
      .then((data) => {
        sendResponse(data, res)
      })
      .catch((err: FastifyError) => {
        handleError(err, res)
      })
  })

  app.get('/titles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)

    await prisma.peopleTitles
      .findUnique({
        where: {
          id,
        },
      })
      .then((data) => {
        sendResponse(data, res)
      })
      .catch((err: FastifyError) => {
        handleError(err, res)
      })
  })

  app.post('/titles/', async (req: FastifyRequest, res: FastifyReply) => {
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

    const { id, name } = req.body as IRoles

    await prisma.peopleTitles
      .create({
        data: {
          id,
          name,
        },
      })
      .then((data) => {
        sendResponse(data, res, 201)
      })
  })

  app.post('/titles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

    const { name } = req.body as IRoles

    await prisma.peopleTitles
      .update({
        where: {
          id,
        },
        data: {
          name,
        },
      })
      .then((data) => {
        sendResponse(data, res, 200)
      })
      .catch((err: FastifyError) => {
        handleError(err, res)
      })
  })

  app.delete('/titles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)

    await prisma.peopleTitles
      .delete({
        where: {
          id,
        },
      })
      .then(() => {
        sendResponse({ message: 'Deleted' }, res, 200)
      })
      .catch((err: FastifyError) => {
        handleError(err, res)
      })
  })

  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    await prisma.people
      .findMany()
      .then((data) => {
        sendResponse(data, res)
      })
      .catch((err: FastifyError) => {
        handleError(err, res)
      })
  })

  app.get('/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)

    await prisma.people
      .findUnique({
        where: {
          id,
        },
      })
      .then((data) => {
        sendResponse(data, res)
      })
      .catch((err: FastifyError) => {
        handleError(err, res)
      })
  })

  app.post('/', async (req, res) => {
    const bodySchema = z.object({
      dataType: z.string(),
    })

    type TBody = z.infer<typeof bodySchema>

    if (!req.body) sendResponse({ message: 'No body provided' }, res, 400)

    const validatedBody = bodySchema.parse(req.body)

    const { dataType } = validatedBody as TBody

    if (dataType === 'getGrid') {
      const selectFields = {
        select: {
          id: true,
          fullName: true,
          titleId: true,
          rolesId: true,
          phone1: true,
          phone1IsWhatsapp: true,
          dateOfBirth: true,
        },
      }

      await prisma.people
        .findMany(selectFields)
        .then((data) => {
          sendResponse(data, res)
        })
        .catch((err: FastifyError) => {
          handleError(err, res)
        })
    } else {
      const {
        id,
        fullName,
        titleId,
        rolesId,
        dateOfBirth,
        gender,
        address,
        complement,
        city,
        suburb,
        uf,
        cep,
        phone1,
        phone1IsWhatsapp,
        phone2,
        photoUrl,
        email,
      } = req.body as TPeople

      await prisma.people
        .create({
          data: {
            id,
            fullName,
            titleId,
            rolesId,
            dateOfBirth,
            gender,
            address,
            complement,
            city,
            suburb,
            uf,
            cep,
            phone1,
            phone1IsWhatsapp,
            phone2,
            photoUrl,
            email,
          },
        })
        .then((data) => {
          sendResponse(data, res, 201)
        })
    }
  })

  app.post('/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const {
      id,
      fullName,
      titleId,
      rolesId,
      dateOfBirth,
      gender,
      address,
      complement,
      city,
      suburb,
      uf,
      cep,
      phone1,
      phone1IsWhatsapp,
      phone2,
      photoUrl,
      email,
    } = req.body as TPeople

    const data = await prisma.people.update({
      where: {
        id,
      },
      data: {
        fullName,
        titleId,
        rolesId,
        dateOfBirth,
        gender,
        address,
        complement,
        city,
        suburb,
        uf,
        cep,
        phone1,
        phone1IsWhatsapp,
        phone2,
        photoUrl,
        email,
      },
    })

    sendResponse(data, res, 200)
  })

  app.delete('/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)

    await prisma.people.delete({
      where: {
        id,
      },
    })
    sendResponse({ message: 'Deleted' }, res, 200)
  })
}
