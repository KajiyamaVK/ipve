import fastify from 'fastify'
import { generalRoutes } from './routes/general'
import cookie from '@fastify/cookie'
import { people } from './routes/people'
import cors from '@fastify/cors'
export const app = fastify()

app.register(cookie) // Tem que ser o primeiro register dessa lista
app.register(cors)
app.register(generalRoutes)
app.register(people, {
  prefix: '/people',
})

app
  .listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3001,
  })
  .then(() => {
    console.log('Server listening')
  })
