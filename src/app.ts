import buildServer from './server'



export const server = buildServer();


server.listen({ port: 3001 }, err => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    console.log('🚀 Server running on http://localhost:3001')
})
