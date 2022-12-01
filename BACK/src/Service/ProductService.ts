import { ObjectId } from "mongodb";
import { Product } from "../Models/db/Product"
import { MongoService } from "./MongoService"

export class ProductService {
  private static readonly collectionName = "product";

  static async getAllProducts() {
    const collection = await MongoService.getCollection<Product>(ProductService.collectionName)
    const products = await collection.find().toArray()

    return products
  }

  static async getOneProduct(productId: string) {
    const collection = await MongoService.getCollection<Product>(ProductService.collectionName)
    const product = await collection.findOne({ _id: ObjectId.createFromHexString(productId) })

    return product
  }

  static async insertProduct(product: Product) {
    const collection = await MongoService.getCollection<Product>(ProductService.collectionName)
    
    await collection.insertOne({
      // Ici je ne passe pas directemement l'objet product car l'utilisateur pourrait ajouter d'autres propriétés
      name: product.name,
      price: product.price,
      type: product.type,
      warranty_years: product.warranty_years,
      available: product.available,
      rating: 0 // Un nouveau produit n'a pas encore d'évaluation
    })
  }

  static async findAndUpdateProduct(productId: string, product: Product) {
    const collection = await MongoService.getCollection<Product>(ProductService.collectionName)
    
    const queryResult = await collection.findOneAndUpdate({
      _id: ObjectId.createFromHexString(productId)
    }, {
      $set: {
        // Ici je ne passe pas directemement l'objet product car l'utilisateur pourrait ajouter d'autres propriétés
        name: product.name,
        price: product.price,
        type: product.type,
        rating: product.rating,
        warranty_years: product.warranty_years,
        available: product.available
      }
    })

    return queryResult;
  }

  static async deleteProduct(productId: string) {
    const collection = await MongoService.getCollection<Product>(ProductService.collectionName)

    const queryResult = await collection.deleteOne({ _id: ObjectId.createFromHexString(productId) })

    return queryResult.deletedCount === 1
  }
}