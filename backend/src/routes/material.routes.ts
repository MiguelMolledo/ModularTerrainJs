

import { FastifyInstance } from 'fastify';
import { verifyToken, verifyTokenAndRole } from '../controllers/auth.controller';
import { checkPermission } from '../middleware/checkPermissions';
import * as controller from '../controllers/material.controller';
import { Action } from '../types/roles';
export default async function materialRoutes(fastify: FastifyInstance) {
    fastify.get('/all', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
        }
    }, controller.getAll);

    fastify.get('/:id', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
        }
    }, controller.getById);

    fastify.post('/', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
            await verifyTokenAndRole(req, reply, 'admin');
        }
    },
        controller.create);

    fastify.put('/:id', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
            await verifyTokenAndRole(req, reply, 'admin');
        }
    }, controller.updateById);

    fastify.delete('/:id', {
        preHandler: async (req, reply) => {
            await checkPermission(Action.DeleteMaterial)(req, reply);
        }
    }, controller.deleteById);





}