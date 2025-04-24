import Fastify from 'fastify'
import dbConnector from './plugins/db'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import materialRoutes from './routes/material.routes'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV?.toLowerCase() || 'dev'}` });




function buildServer() {
    const server = Fastify({
        logger: true,
    })

    server.register(dbConnector)
    server.register(userRoutes, { prefix: '/users' })
    server.register(authRoutes, { prefix: '/auth' })
    server.register(materialRoutes, { prefix: '/materials' })

    server.get('/healthcheck', async (request, reply) => {
        return { hello: 'world' }
    })


    return server
}

export default buildServer;