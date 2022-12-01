import { Request, Response } from 'express'
import { LoginRequest } from '../Models/request/LoginRequest'
import { RequestException } from '../Models/request/RequestException'
import { RequestResponse } from '../Models/request/RequestResponse'
import { AuthService } from '../Service/AuthService'

export class AuthController {

  static async login(req: Request, res: Response) {
    const { email, psw }: LoginRequest = req.body

    try {
      const accessToken = await AuthService.login(email, psw)

      res.cookie("loginToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        domain: "localhost",
        maxAge: 1000 * 60 * 60 * 24 * 2 // 2 jours
      });

      const response: RequestResponse<null> = {
        isError: false,
        value: null
      }

      res.status(200).json(response)

    } catch (error) {
      RequestException.sendErrorResponse(res, error)
    }
  }

}