import Fastify from 'fastify'
import dbConnector from './plugins/db'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import materialRoutes from './routes/material.routes'
import dotenv from 'dotenv'

dotenv.config()
export const app = Fastify({
    logger: true,
})

app.register(dbConnector)
app.register(userRoutes, { prefix: '/users' })
app.register(authRoutes, { prefix: '/auth' })
app.register(materialRoutes, { prefix: '/materials' })

app.get('/', async (request, reply) => {
    return { hello: 'world' }
})


app.listen({ port: 3000 }, err => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    console.log('🚀 Server running on http://localhost:3000')
})