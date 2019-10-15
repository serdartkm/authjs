
const jwt = require('jsonwebtoken')

import { SocketClient, SocketServer } from '../../messaging/mock-socket'

const authentication = require('../authentication')
describe("authentication", () => {

    it("should pass", async () => {

        try {
            const token = await jwt.sign({ data: "serdar" }, "process.env.secret", { expiresIn: '1h' })

            let handshake = { query: { token } }
            let server = new SocketServer()
            let client = new SocketClient(handshake)////
            server.use(authentication)
            server.on("connection",(socket)=>{
                console.log("soc",socket)//
            })
            client.connect()
        } catch (error) {

        }


        //
    })

    it("should fail", () => {

    })
})