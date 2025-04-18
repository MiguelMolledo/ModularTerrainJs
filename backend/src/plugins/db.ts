import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import { FastifyInstance } from 'fastify'
export default fp(async function dbConnector(fastify: FastifyInstance) {
    try {
        fastify.log.info('🔌 Attempting MongoDB connection...')
        await mongoose.connect('mongodb://localhost:27017/myapp')
        fastify.log.info('✅ MongoDB connected')
    } catch (err) {
        fastify.log.error('❌ MongoDB connection error:', err)
        throw err
    }
})
