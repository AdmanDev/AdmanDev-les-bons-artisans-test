import { RequestResponse } from '../models/RequestResponse'
import { AxiosConfigurator } from './AxiosConfigurator'

const axios = AxiosConfigurator.getAxiosInstance('auth')

export class AuthService {
  static async login (email: string, psw: string) {
    const response = await axios.post<RequestResponse<null>>('/', {
      email,
      psw
    })
    return response.data
  }
}
