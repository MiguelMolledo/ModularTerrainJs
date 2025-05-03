import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import { FastifyInstance } from 'fastify'

export default fp(async function dbConnector(fastify: FastifyInstance) {
    const baseUri = process.env.DATA_BASE_URI
    const dbName = process.env.DATA_BASE_NAME
    const env = (process.env.NODE_ENV || 'DEV').toUpperCase()
    let envSuffix = ''

    switch (env) {
        case 'PROD':
            envSuffix = '_PROD'
            break
        case 'BETA':
            envSuffix = '_BETA'
            break
        case 'TEST':
            envSuffix = '_TEST'
            break
        default:
            envSuffix = '_DEV'
    }

    const dataBaseURI = `${baseUri}/${dbName}${envSuffix}`
    try {
        fastify.log.info(`🔌 Attempting MongoDB connection... ${dataBaseURI}`)
        await mongoose.connect(dataBaseURI)
        fastify.log.info('✅ MongoDB connected')
    } catch (err) {
        fastify.log.error('❌ MongoDB connection error:', err)
        throw err
    }
})
