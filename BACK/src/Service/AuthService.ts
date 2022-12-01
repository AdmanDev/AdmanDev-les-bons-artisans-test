import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { User } from "../Models/db/User";
import { LoginTokenPayload } from "../Models/LoginTokenPayload";
import { RequestException } from "../Models/request/RequestException";
import { MongoService } from "./MongoService";

export class AuthService {
  private static readonly collectionName = "user";

  static async signup(email: string, psw: string, pswConfirm: string) {
    if (psw !== pswConfirm) {
      throw new RequestException("Le mot de passe et la confirmation sont différents", 401)
    }

    const existUser = await AuthService.getUserByEmail(email)
    if (existUser) {
      throw new RequestException("Ce mail est déjà utilisé !", 409)
    }

    const collection = await MongoService.getCollection<User>(AuthService.collectionName)

    const hacthedPsw = await bcrypt.hash(psw, 10);

    const user: User = {
      email,
      password: hacthedPsw
    }

    await collection.insertOne(user)
  }

  static async login(email: string, psw: string) {
    const user = await AuthService.getUserByEmail(email)

    if (user === null || !await bcrypt.compare(psw, user.password)) {
      throw new RequestException("Email ou mot de passe incorrect", 403)
    }

    const tokenPayload: LoginTokenPayload = {
      userId: user._id.toHexString()
    }

    const accessToken = jwt.sign(
      tokenPayload,
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );
    
    return accessToken
  }

  static async getUserByEmail(email: string) {
    const collection = await MongoService.getCollection<User>(AuthService.collectionName)
    return await collection.findOne({ email })
  }

}