import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestException } from "../../Models/request/RequestException";

export class Validator {
	static validate(req: Request, res: Response, next: NextFunction) {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			return next()
		}

		const extractedErrors = errors
			.array()
			.filter(err => err.msg !== "Invalid value")
			.map(err => err.msg).join("\u000A")

		RequestException.sendErrorResponse(res, new RequestException(extractedErrors, 400))
	}
}