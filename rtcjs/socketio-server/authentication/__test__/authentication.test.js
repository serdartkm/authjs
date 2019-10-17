
const jwt = require('jsonwebtoken')
const path =require('path')
require('dotenv').config({path:path.join(__dirname, `./.env`)})//
const SocketServer =require('socket.io')
const SocketClient =require('socket.io-client')

const authentication = require('../authentication')
describe("authentication", () => {
    let token =''
beforeEach(async()=>{
 token = await jwt.sign({ data: "aman" }, process.env.secret, { expiresIn: '1h' })
})
    it("should pass", async () => {

        try {


            let handshake = { query: { token } }
            let server = new SocketServer()
            let client = new SocketClient(handshake)
            server.use(authentication)
            server.on("connection",(socket)=>{
                expect(socket.username).toBe("aman")
            })
            client.connect()
        } catch (error) {
            console.log(error)
        }
    })

    it("next should be called", async() => {
        let handshake = { query: { token } }
       let client = new SocketClient(handshake)
         let spyNext =jest.fn()
        await authentication(client.socket,spyNext)
         expect(spyNext.mock.calls.length).toBe(1)
         expect(spyNext.mock.calls[0][0]).toBe(undefined)
       
    })
    it("next should be called with error", async() => {
        let handshake = { query: { token:"dd" } }
        let client = new SocketClient(handshake)
          let spyNext =jest.fn()
         await authentication(client.socket,spyNext)
          expect(spyNext.mock.calls.length).toBe(1)
          expect(spyNext.mock.calls[0][0]).not.toBe(undefined)
    })
})