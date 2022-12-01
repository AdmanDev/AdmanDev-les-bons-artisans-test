import { Server } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import http from "http"
import { SocketMessages } from "../Models/socket/SocketMessages"
import { ProductService } from "./ProductService"


export class SocketService {
	private static io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>

	static initService (server: http.Server) {
		SocketService.io = new Server(server, {
			cors: {
				origin: process.env.SERVER_ADDRESS,
				methods: ["GET", "POST"],
				credentials: true,
			},
		})
	}

	static async sendProductList() {
		const products = await ProductService.getAllProducts()
		SocketService.io.emit(SocketMessages.PRODUCTLIST_UPDATE, products)
	}

}