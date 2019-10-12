

import { SocketClient, SocketServer } from '../mock-socket'

const expressSocketIOMessaging = require('../index')
const server = new SocketServer()
const client = new SocketClient()

describe("expressjs-socketio-messaging", () => {

    it.only("text_message event should be triggered with correct data", (done) => {
       
        server.on("connection", (socket) => {
            socket.join("victory")
            expressSocketIOMessaging(socket)
        })
        client.connect()
        client.on("text_message", (data) => {
            expect(data).toEqual({ datetime: "1", message: "hi", reciever: "drag" })
            done()
        })
        client.emit("text_message", { datetime: "1", message: "hi", reciever: "drag" })


    })



})