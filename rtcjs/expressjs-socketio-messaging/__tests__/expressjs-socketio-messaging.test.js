

import { SocketClient, SocketServer } from '../mock-socket'

const expressSocketIOMessaging = require('../index')
const server = new SocketServer()
const client = new SocketClient()

describe("expressjs-socketio-messaging", () => {

    it("text_message event should be triggered by server", () => {
        server.on("connection", (socket) => {
               expressSocketIOMessaging(socket)
       //     socket.emit("text_message", "hello from client")
        })
      
        client.connect()
        client.emit("text_message", "fff")
    })

})