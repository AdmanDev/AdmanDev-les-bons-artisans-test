import { Response } from "express";
import { RequestResponse } from "./RequestResponse";

export class RequestException {
	public message: string;
	public statusCode: number;

	constructor (message: string, statusCode = 500) {
		this.message = message;
		this.statusCode = statusCode;
	}

	static sendErrorResponse (res: Response, error: unknown) {
		let message = "Une erreur est survenue";
		let statusCode = 500;

		if (error instanceof RequestException) {
			message = error.message;
			statusCode = error.statusCode
		}

		if (error instanceof Error) {
			message = error.message
		}

		const result: RequestResponse<null> = {
			isError: true,
			message
		};

		res.status(statusCode).json(result);
	}

}