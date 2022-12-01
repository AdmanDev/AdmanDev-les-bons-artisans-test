import { body } from "express-validator";
import { Validator } from "./Validator";

export class AuthValidators {
	static loginValidator() {
		return [
			body("email", "Votre email est invalide").isEmail(),
			body("psw", "Saisissez votre mot de passe").notEmpty().isString(),
			Validator.validate
		];
	}
}