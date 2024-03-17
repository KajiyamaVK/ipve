import fastify from 'fastify'
//import 'dotenv/config'
//import { generalRoutes } from './routes/general'
import cookie from '@fastify/cookie'
import { roles } from './routes/people/roles'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import mySql from '@fastify/mysql'
import { MySQLPool } from '@fastify/mysql'
import { titles } from './routes/people/titles'
import { people } from './routes/people/people'
import { kinsRelations } from './routes/people/kinsRelations'
import { env } from './env'

// if you only pass connectionString
declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPool
  }
}

export const app = fastify()

app.register(cookie) // Tem que ser o primeiro register dessa lista

app.register(multipart)
app.register(cors)
//app.register(generalRoutes)
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
app.register(mySql, {
  connectionString: env.DATABASE_URL,
})

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT ? Number(env.PORT) : 3001,
  })
  .then(() => {
    console.info('Server running')
  })
