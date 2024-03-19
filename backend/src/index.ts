import fastify from 'fastify'
//import 'dotenv/config'
//import { generalRoutes } from './routes/general'
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

// if you only pass connectionString
declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPool
  }
}

export const app = fastify({ logger: true })

app.register(cookie) // Tem que ser o primeiro register dessa lista

app.register(multipart)
app.register(cors)
app.register(fastifyCaching, {
  privacy: 'private',
})
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
app.register(storePeoplePhoto, {
  prefix: '/people/storePeoplePhoto',
})
app.register(mySql, {
  connectionString: env.DATABASE_URL,
})

console.log('server running')

module.exports = app
