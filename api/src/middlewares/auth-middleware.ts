import { FastifyRequest, FastifyReply } from 'fastify'
import { authService } from '../services/auth-service'


export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const accessToken = request.cookies.accessToken

    if (!accessToken) {
      return reply.status(401).send({
        success: false,
        error: 'Authentication required',
      })
    }


    const payload = authService.verifyAccessToken(accessToken)
    ;(request as any).userId = payload.userId
    ;(request as any).userEmail = payload.email
  } catch (error) {
    return reply.status(401).send({
      success: false,
      error: 'Invalid or expired token',
    })
  }
}

export async function optionalAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const accessToken = request.cookies.accessToken

    if (accessToken) {
      const payload = authService.verifyAccessToken(accessToken)
      ;(request as any).userId = payload.userId
      ;(request as any).userEmail = payload.email
    }
  } catch (error) {
  }
}
