import { io, Socket } from 'socket.io-client'
import { Product } from '../models/Product'
import { SocketMessages } from '../models/SocketMessages'

const serverUrl = process.env.REACT_APP_SERVER_URL as string

export default class SocketService {
  private static socket: Socket

  static connect () {
    if (!SocketService.socket) {
      SocketService.socket = io(serverUrl, { transports: ['websocket'] })
    }

    if (SocketService.socket.disconnected) {
      SocketService.socket.connect()

      SocketService.socket.on(SocketMessages.CONNECT, () => {
        console.log('Socket connected !')
      })
    }
  }

  static disconnect () {
    SocketService.socket.disconnect()
  }

  static onProductListUpdate (listener: (products: Product[]) => void) {
    SocketService.socket.on(SocketMessages.PRODUCTLIST_UPDATE, listener)

    return () => SocketService.socket.removeListener(SocketMessages.PRODUCTLIST_UPDATE, listener)
  }
}
