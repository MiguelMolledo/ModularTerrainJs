

import { FastifyInstance } from 'fastify';
import { verifyTokenAndRole, verifyTokenAndRoleOrSelf } from '../utils/auth'
import { checkPermission } from '../middleware/checkPermissions';
import * as controller from '../controllers/material.controller';
import { Action } from '../types/roles';
export default async function materialRoutes(fastify: FastifyInstance) {
    fastify.get('/all',
        //     {
        //     preHandler: async (req, reply) => {
        //         await checkPermission(Action.GetAllMaterials)(req, reply)
        //     }
        // },
        controller.getAll);

    fastify.get('/:id', {
        preHandler: async (req, reply) => {
            1
            await verifyTokenAndRoleOrSelf(req, reply, 'admin')
        }
    }, controller.getById);

    fastify.post('/', controller.create);

    fastify.put('/:id', {
        preHandler: async (req, reply) => {
            await verifyTokenAndRoleOrSelf(req, reply, 'admin')
        }
    }, controller.updateById);

    fastify.delete('/:id', {
        preHandler: async (req, reply) => {
            await verifyTokenAndRoleOrSelf(req, reply, 'admin')
        }
    }, controller.deleteById);






}