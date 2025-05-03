import { FastifyInstance } from 'fastify'
import * as controller from '../controllers/auth.controller'

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', controller.login)
    fastify.post('/register', controller.register)

}

