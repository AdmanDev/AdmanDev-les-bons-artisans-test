import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { LoginTokenPayload } from '../Models/LoginTokenPayload';
import { RequestException } from '../Models/request/RequestException'

export class AuthMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies["loginToken"]

      if (!token) {
        throw new RequestException("Veuillez vous authentifier", 401)        
      }

      const tokenPayload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as LoginTokenPayload
      if (!tokenPayload?.userId) {
        throw new RequestException("Erreur lors de l'authentification", 403)
      } 

      next()

    } catch (error) {
      RequestException.sendErrorResponse(res, error)
    }
  }
}