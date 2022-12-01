import http from "http"
import express from "express"
import { MongoService } from "./Service/MongoService"
import { ProductRoutes } from "./Routes/ProductRoutes"
import { SocketService } from "./Service/SocketService"
import { AuthRoutes } from "./Routes/AuthRoutes"
import cookieParser from "cookie-parser"

interface ErrorHandlerType { 
  syscall: string, 
  code: string 
}

export class App {
  static server?: http.Server
  static port: number

  static init() {
    if (App.server) {
      return
    }

    //Create server
    const app = App.createExpressApp()
    App.server = http.createServer(app)
    
    App.server.on("listening", () => console.log(`Server started at http://localhost:${App.port}`))
    App.server.on("error", App.errorHandler)

    App.port = parseInt(process.env.PORT as string, 10) || 9000

    // Start server
    App.server.listen(App.port, App.server.address() as string)

    // Connect to Mongo db
    MongoService.connect()

    // Init socket service
    SocketService.initService(App.server)
  }

  private static createExpressApp() {
    // Configure Express Application
    const app = express()

    app.enable("trust proxy")
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", process.env.WEBSITEURL as string)
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
      res.setHeader("Access-Control-Allow-Credentials", "true")
      next()
    })

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cookieParser());

    //Routes
    app.use("/product", ProductRoutes.init())
    app.use("/auth", AuthRoutes.init())

    return app
  }

  private static errorHandler(error: ErrorHandlerType) {
    if (error.syscall !== "listen") {
      throw error
    }

    const address = `http://localhost:${App.port}`

    switch (error.code) {
      case "EACCES":
        console.error(address + " requires elevated privileges.")
        process.exit(1)
        break

      case "EADDRINUSE":
        console.error(address + " is already in use.")
        process.exit(1)
        break

      default:
        throw error
    }
  }

}

App.init()