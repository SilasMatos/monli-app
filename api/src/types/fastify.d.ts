import { FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    cookies: {
      accessToken?: string
      refreshToken?: string
    }
    userId?: string
    userEmail?: string
  }
}
