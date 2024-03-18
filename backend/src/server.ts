import fastify from 'fastify'
// import 'dotenv/config'
// import { generalRoutes } from './routes/general'
import cookie from '@fastify/cookie'
import { roles } from './routes/people/roles'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import mySql from '@fastify/mysql'
import fastifyCaching from '@fastify/caching'
import { MySQLPool } from '@fastify/mysql'
import { titles } from './routes/people/titles'
import { people } from './routes/people/people'
import { kinsRelations } from './routes/people/kinsRelations'
import { env } from './env'
import { storePeoplePhoto } from './routes/people/storePhoto'

declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPool
  }
}

const app = fastify({ logger: true })

app.register(cookie) // Must be the first register in this list

app.register(multipart)
app.register(cors)
app.register(fastifyCaching, {
  privacy: 'private',
})
// app.register(generalRoutes)
app.register(people, {
  prefix: '/people',
})
app.register(roles, {
  prefix: '/people/roles',
})
app.register(titles, {
  prefix: '/people/titles',
})
app.register(kinsRelations, {
  prefix: '/people/kinsRelations',
})
app.register(storePeoplePhoto, {
  prefix: '/people/storePeoplePhoto',
})
app.register(mySql, {
  connectionString: env.DATABASE_URL,
})

// Conditional listen for local development
if (require.main === module) {
  app
    .listen({
      host: '0.0.0.0',
      port: env.PORT ? Number(env.PORT) : 3001,
    })
    .then(() => {
      console.info('Server running locally')
    })
} else {
  // Just export the app for Vercel
  module.exports = app
}
