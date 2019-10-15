

import { SocketClient, SocketServer } from '../mock-socket'

const messaging = require('../messaging')
describe("expressjs-socketio-messaging", () => {

    it("text_message event should be triggered with correct data", (done) => {
        let server = new SocketServer()
        let client = new SocketClient("token")
        server.on("connection", (socket) => {
            socket.username ="mario"
            socket.join("drag")
            messaging(socket,()=>{})
        })
        client.connect()
        client.on("text_message", (data) => {

            expect(data).toEqual({ datetime: "1", message: "hi", sender: "mario" })
            done()
        })
        client.emit("text_message", { datetime: "1", message: "hi", reciever: "drag" })

    })

    it("message should be sent to specific room", (done) => {

        let server = new SocketServer()
        let client = new SocketClient()
        let spy = jest.spyOn(client.socket, 'to')
        server.on("connection", (socket) => {
            socket.username ="mario"
            socket.join("drag")
            messaging(socket,()=>{})
            done()
        })
        client.connect()

        client.emit("text_message", { datetime: "1", message: "hi", reciever: "drag" })//
        expect(spy).toHaveBeenCalledTimes(2)
        expect(spy).toHaveBeenCalledWith("drag")
        spy.mockClear()
    })


})