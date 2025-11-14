import { fastify } from 'fastify'
import {
  serializerCompiler, 
  validatorCompiler, 
  jsonSchemaTransform,
  type ZodTypeProvider,
} from  'fastify-type-provider-zod'
import {fastifySwagger } from '@fastify/swagger'
import { fastifyCors} from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { authRoutes } from './routes/auth-routes'
import { env } from './env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// CORS configuration
app.register(fastifyCors, {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
})

// Cookie support for HTTP-only cookies
app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
  parseOptions: {},
})

// Swagger documentation
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Monli Financial Management API',
      description: 'API for personal financial management with JWT authentication, 2FA, and Google OAuth.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

// API Reference Documentation
app.register(ScalarApiReference, {
  routePrefix: '/docs',
})

// Health check route
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Register routes
app.register(authRoutes)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
	console.log('🚀 HTTP server running on http://localhost:3333')
	console.log('📚 API Documentation: http://localhost:3333/docs')
	console.log('🔐 Authentication endpoints available')
})
