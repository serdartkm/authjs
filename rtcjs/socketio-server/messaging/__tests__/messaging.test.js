

//import { SocketClient, SocketServer } from '../mock-socket'
const SocketServer =require('socket.io')
const SocketClient =require('socket.io-client')
const messaging = require('../messaging')
describe("expressjs-socketio-messaging", () => {

    it.skip("text_message event should be triggered with correct data", (done) => {
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

    it.only("message should be sent to specific room", (done) => {
  debugger
        let server = new SocketServer()
        let client = new SocketClient()
        client.on('message',(data)=>{
            debugger
            console.log("message recived")
        })
        server.on('connection',(socket)=>{
           
            debugger
            socket.emit("message","hello")
            done()
        })

       // let spy = jest.spyOn(client.socket, 'to')
        // server.on("connection", (socket) => {
        //     socket.username ="mario"
        //     socket.join("drag")
        //     messaging(socket,()=>{})
        //     done()
        // })
     

       // client.emit("text_message", { datetime: "1", message: "hi", reciever: "drag" })//
      //  expect(spy).toHaveBeenCalledTimes(2)
      //  expect(spy).toHaveBeenCalledWith("drag")
      //  spy.mockClear()
    })


})