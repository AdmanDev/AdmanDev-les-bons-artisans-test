import express from "express";
import { ProductController } from "../Controllers/ProductController";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import { ProductValidators } from "../Middlewares/Validators/ProductValidators";

export class ProductRoutes {
	static init () {
		const router = express.Router();

		router.get("/",
			AuthMiddleware.verifyToken,
			ProductController.getAllProduct)

		router.get("/:id",
			AuthMiddleware.verifyToken,
			ProductValidators.validateParamProductId(),
			ProductController.getOneProduct)
		
		router.post("/",
			AuthMiddleware.verifyToken,
			ProductValidators.validateProductInputs(),
			ProductController.addProduct)
		
		router.put("/:id",
			AuthMiddleware.verifyToken,
			ProductValidators.validateProductInputs(),
			ProductValidators.validateParamProductId(),
			ProductController.editProduct)
		
		router.delete("/:id",
			AuthMiddleware.verifyToken,
			ProductValidators.validateParamProductId(),
			ProductController.deleteProduct)

		return router;
	}
}