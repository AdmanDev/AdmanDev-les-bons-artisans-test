import { Request, Response } from "express";
import { WithId } from "mongodb"
import { Product } from "../Models/db/Product";
import { RequestResponse } from "../Models/request/RequestResponse";
import { RequestException } from "../Models/request/RequestException";
import { ProductService } from "../Service/ProductService";
import { SocketService } from "../Service/SocketService";

export class ProductController {

  static async getAllProduct (req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      
      const result: RequestResponse<WithId<Product>[]> = {
        isError: false,
        value: products
      }
      res.status(200).json(result)

    } catch (error) {
      RequestException.sendErrorResponse(res, error)
    }
  }

  static async getOneProduct(req: Request, res: Response) {
    const productId = req.params.id

    try {
      const product = await ProductService.getOneProduct(productId);

      if (!product) {
        throw new RequestException("Le produit est introuvable !", 404)
      }
      
      const result: RequestResponse<WithId<Product>> = {
        isError: false,
        value: product
      }
      res.status(200).json(result)
      
    } catch (error) {
      RequestException.sendErrorResponse(res, error)
    }
  }

  static async addProduct(req: Request, res: Response) {
    const product: Product = req.body
    
    try {
      await ProductService.insertProduct(product)

      const result: RequestResponse<null> = {
        isError: false,
        value: null
      }

      res.status(201).json(result)

      SocketService.sendProductList()

    } catch (error) {
      RequestException.sendErrorResponse(res, error)
    }
  }

  static async editProduct (req: Request, res: Response) {
    const product: Product = req.body
    const productId = req.params.id

    try {
      const queryResult = await ProductService.findAndUpdateProduct(productId, product)

      if (!queryResult.value) {
        throw new RequestException("Le produit est introuvable !", 404)
      }

      const result: RequestResponse<null> = {
        isError: false,
        value: null
      }

      res.status(200).json(result)

      SocketService.sendProductList()

    } catch (error) {
      RequestException.sendErrorResponse(res, error)
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const productId = req.params.id

    try {
      const deleted = await ProductService.deleteProduct(productId)
      
      if (!deleted) {
        throw new RequestException("Le produit est introuvable !", 404)
      }

      const result: RequestResponse<null> = {
        isError: false,
        value: null
      }

      res.status(200).json(result)

      SocketService.sendProductList()

    } catch (error) {
      RequestException.sendErrorResponse(res, error)
    }
  }

}