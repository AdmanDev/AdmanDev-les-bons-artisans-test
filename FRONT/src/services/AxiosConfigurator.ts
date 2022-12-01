import axios from 'axios'

const apiUrl = process.env.REACT_APP_SERVER_URL

export class AxiosConfigurator {
  static getAxiosInstance (endPoint: string) {
    return axios.create({
      baseURL: `${apiUrl}/${endPoint}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*; charset=utf-8'
      },
      withCredentials: true
    })
  }
}
