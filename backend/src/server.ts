import fastify from 'fastify'

const app = fastify()

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

app.listen({
  port: 3001
}).then(() => {
  console.log('Server listening on port 3001')
})
