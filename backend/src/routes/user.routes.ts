import { FastifyInstance } from 'fastify'
import { verifyToken, verifyTokenAndRole } from '../controllers/auth.controller'
import * as controller from '../controllers/user.controller'

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/all', controller.getAll)
    fastify.get('/:id', controller.getById)
    fastify.get('/current', {
        preHandler: async (req, reply) => {
            await verifyTokenAndRole(req, reply, 'admin')
            reply.code(200).send({ message: 'Welcome Admin Boss' })
        }
    }, controller.getCurrent)
    fastify.put('/:id', controller.updateById)
    fastify.delete('/:id', controller.deleteById)

}


