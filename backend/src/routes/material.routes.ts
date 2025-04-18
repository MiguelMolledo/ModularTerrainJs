

import { FastifyInstance } from 'fastify';
import { verifyToken, verifyTokenAndRole } from '../controllers/auth.controller';
import * as controller from '../controllers/material.controller';

export default async function materialRoutes(fastify: FastifyInstance) {
    fastify.get('/all', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
        }
    }, controller.getAll)

    fastify.get('/:id', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
        }
    }, controller.getById)

    fastify.get('/:name', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
        }
    }, controller.getByName)

    fastify.post('/', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
            await verifyTokenAndRole(req, reply, 'admin');
        }
    },
        controller.create)

    fastify.put('/:id', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
            await verifyTokenAndRole(req, reply, 'admin');
        }
    }, controller.updateById)

    fastify.delete('/:id', {
        preHandler: async (req, reply) => {
            await verifyToken(req, reply);
            await verifyTokenAndRole(req, reply, 'admin');
        }
    }, controller.deleteById)





}