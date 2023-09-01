import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errorFormating/apiError'
import { verifyToken } from '../helpers/jwtHelpers'
import config from '../config'

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get Authorization Token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      // Varify Token
      let verifiedUser = null
      verifiedUser = verifyToken(token, config.jwt.secret as Secret)
      req.user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
