import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0', // Escutar em todas as interfaces
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${env.PORT}!`)
  })
  .catch((err) => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
