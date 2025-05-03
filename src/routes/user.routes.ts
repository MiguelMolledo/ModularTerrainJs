import { FastifyInstance } from 'fastify'
import { verifyTokenAndRole, verifyTokenAndRoleOrSelf } from '../utils/auth'
import * as controller from '../controllers/user.controller'

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        preHandler: async (req, reply) => {
            await verifyTokenAndRole(req, reply, 'admin')
        }
    }, controller.getAll)
    fastify.get('/:id', {
        preHandler: async (req, reply) => {
            await verifyTokenAndRoleOrSelf(req, reply, 'admin')
        }
    }, controller.getById)
    fastify.get('/current', {
        preHandler: async (req, reply) => {
            await verifyTokenAndRole(req, reply, 'admin')
        }
    }, controller.getCurrent)


    fastify.put('/:id', {
        preHandler: async (req, reply) => {
            await verifyTokenAndRoleOrSelf(req, reply, 'admin')
        }
    }, controller.updateById)
    fastify.delete('/:id', {
        preHandler: async (req, reply) => {
            await verifyTokenAndRoleOrSelf(req, reply, 'admin')
        }
    }, controller.deleteById)

}


