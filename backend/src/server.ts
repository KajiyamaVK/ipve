import fastify from 'fastify'
import { generalRoutes } from './routes/general'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie) // Tem que ser o primeiro register dessa lista
app.register(generalRoutes)

app
  .listen({
    port: 3001,
  })
  .then(() => {
    console.log('Server listening on port 3001')
  })
