import { PrismaClient } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { IRoles, TPeople } from '../types/people'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

export async function people(app: FastifyInstance) {
  const prisma = new PrismaClient()
  app.get('/roles', async (req: FastifyRequest, res: FastifyReply) => {
    await prisma.peopleRoles.findMany().then((data) => {
      return res.status(200).send(data)
    })
  })

  app.get('/roles/:id', async (req: FastifyRequest) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)

    await prisma.peopleRoles.findUnique({
      where: {
        id,
      },
    })
  })

  app.post('/roles', async (req: FastifyRequest, res: FastifyReply) => {
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

    const { id, name, tailwindColor, description } = req.body as IRoles
    console.log('app.post  name', name)

    try {
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
          return res.status(201).send(data)
        })
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  })

  app.post('/roles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

    const { name, tailwindColor, description } = req.body as IRoles
    console.log('app.post  name', name)

    try {
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

      return res.status(201).send(data)
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  })

  app.delete('/roles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)
    console.log('app.delete  id', id)
    console.log('app.get /roles/[id] req.params', req.params)

    try {
      await prisma.peopleRoles.delete({
        where: {
          id,
        },
      })
      return res.status(200).send({ message: 'Deleted' })
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  })

  app.get('/titles', async (req: FastifyRequest, res: FastifyReply) => {
    await prisma.peopleTitles.findMany().then((data) => {
      console.log('Get Titles success', data)
      return res.status(200).send(data)
    })
  })

  app.get('/titles/:id', async (req: FastifyRequest) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)

    await prisma.peopleTitles.findUnique({
      where: {
        id,
      },
    })
  })

  app.post('/titles/', async (req: FastifyRequest, res: FastifyReply) => {
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

    const { id, name } = req.body as IRoles
    console.log('app.post  name', name)

    try {
      await prisma.peopleTitles
        .create({
          data: {
            id,
            name,
          },
        })
        .then((data) => {
          return res.status(201).send(data)
        })
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  })

  app.post('/titles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

    const { name } = req.body as IRoles
    console.log('app.post  name', name)

    try {
      const data = await prisma.peopleTitles.update({
        where: {
          id,
        },
        data: {
          name,
        },
      })

      return res.status(201).send(data)
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  })

  app.delete('/titles/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)
    console.log('app.delete  id', id)
    console.log('app.get /roles/[id] req.params', req.params)

    try {
      await prisma.peopleTitles.delete({
        where: {
          id,
        },
      })
      return res.status(200).send({ message: 'Deleted' })
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  })

  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    await prisma.people
      .findMany()
      .then((data) => {
        return res.status(200).send(data)
      })
      .catch((err) => {
        return res.status(500).send({ message: err })
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
        return res.status(200).send(data)
      })
      .catch((err) => {
        return res.status(500).send({ message: err })
      })
  })

  app.post('/', async (req: FastifyRequest, res: FastifyReply) => {
    if (!req.body) return res.status(400).send({ message: 'No body provided' })

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
    console.log('app.post  name', fullName)

    try {
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
          return res.status(201).send(data)
        })
    } catch (err) {
      return res.status(500).send({ message: err })
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

    try {
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

      return res.status(201).send(data)
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  })

  app.delete('/:id', async (req: FastifyRequest, res: FastifyReply) => {
    const params = paramsSchema.parse(req.params)
    const id = parseInt(params.id)
    console.log('app.delete  id', id)
    console.log('app.get /roles/[id] req.params', req.params)

    try {
      await prisma.people.delete({
        where: {
          id,
        },
      })
      return res.status(200).send({ message: 'Deleted' })
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  })
}
