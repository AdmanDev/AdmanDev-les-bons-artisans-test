import { body, param } from "express-validator";
import { Validator } from "./Validator";

export class ProductValidators {
	static validateProductInputs() {
		return [
			body("name", "Le nom du produit est invalide").notEmpty().isString().trim().escape(),
			body("type", "Le type du produit est invalide").notEmpty().isString().trim().escape(),
			body("price", "Le prix du produit est invalide").isCurrency(),
			body("rating", "Le scrore du produit est invalide").isFloat({ min: 0, max: 5 }).optional().default(0),
			body("warranty_years", "La durée de la garantie du produit est invalide").isInt({ min: 0 }),
			body("available", "La disponibilité du produit est requise").isBoolean(),
			Validator.validate
		];
	}

	static validateParamProductId() {
		return [
			param("id", "L'identifiant du produit est invalide").isMongoId(),
			Validator.validate
		]
	}
}