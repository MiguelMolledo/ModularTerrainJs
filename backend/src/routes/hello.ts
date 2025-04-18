import { FastifyInstance } from 'fastify';

export default async function helloRout(fastify: FastifyInstance) {
    fastify.get('/hello', async (request, reply) => {
        return { message: 'Hola que dise' }
    })
}