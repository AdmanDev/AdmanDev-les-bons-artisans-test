import express from "express";
import { AuthController } from "../Controllers/AuthController";
import { AuthValidators } from "../Middlewares/Validators/AuthValidators";

export class AuthRoutes {
	static init () {
    const router = express.Router();
    
    router.post("/",
      AuthValidators.loginValidator(),
      AuthController.login)

		return router;
	}
}