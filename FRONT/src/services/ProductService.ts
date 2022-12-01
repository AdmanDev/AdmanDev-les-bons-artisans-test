import { RequestResponse } from '../models/RequestResponse'
import { Product } from '../models/Product'
import { AxiosConfigurator } from './AxiosConfigurator'

const axios = AxiosConfigurator.getAxiosInstance('product')

export class ProductService {
  static async getProducts () {
    const response = await axios.get<RequestResponse<Product[]>>('/', {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*; charset=utf-8'
      },
      withCredentials: true
    })
    return response.data
  }

  static async getOneProduct (productId: string) {
    const response = await axios.get<RequestResponse<Product>>(`/${productId}`)
    return response.data
  }

  static async addProduct (product: Product) {
    const response = await axios.post<RequestResponse<null>>('/', {
      ...product,
      /**
       * Le validateur "currency" de Express validator semble rejeter les nombres décimaux
       * se terminant par 0 (ex: 52.20). En transformant la valeur en string, cela fonctionne.
       * */
      price: product.price.toString()
    })
    return response.data
  }

  static async editProduct (productId: string, editedProduct: Product) {
    const response = await axios.put<RequestResponse<null>>(`/${productId}`, {
      ...editedProduct,
      price: editedProduct.price.toString()
    })
    return response.data
  }

  static async deleteProduct (productId: string) {
    const response = await axios.delete<RequestResponse<null>>(`/${productId}`)
    return response.data
  }
}
