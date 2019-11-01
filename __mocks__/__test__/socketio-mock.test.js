
const jwt = require('jsonwebtoken')
const messaging = require('../../rtcjs/nodejs-socketio-text-chat/messaging/messaging')
const authentication = require('../../rtcjs/nodejs-socketio-text-chat/authentication/authentication')
describe('socketio server mock', () => {

    beforeEach(() => {
        jest.resetModules()
    })

    it("two socket.io-clients connected to server", async (done) => {

        const tokenMario = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
        const tokenDragos = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
        const tokenBred = await jwt.sign({ data: "bred" }, "secret", { expiresIn: '1h' })
        let server = require('../socket.io')()

        let clientOne = require('../socket.io-client')(tokenMario, "one")
        let clientTwo = require('../socket.io-client')(tokenDragos, "two")
        let clientThree = require('../socket.io-client')(tokenDragos, "three")

        let spyOnMessage = jest.fn(() => { })
        clientOne.onconnection((client) => {
            client.on('message', spyOnMessage)
        })
        clientTwo.onconnection((client) => {

            client.on("message", spyOnMessage)
        })
        clientThree.onconnection((client) => {

            client.on("message", spyOnMessage)
        })
        server.onconnection((socket) => {
            socket.join("mario")
            if (clientThree.connected) {
                socket.to("mario").emit("message", `hello from ${socket.id}`)
            }
        })
        expect(spyOnMessage).toHaveBeenCalledTimes(2)
        expect(spyOnMessage).toHaveBeenCalledWith("hello from three")
        done()
    })


    it("testing middleware registration in right order", async (done) => {
        const token = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
        let server = require('../socket.io')()
        let clientOne = require('../socket.io-client')(token, "one")
        clientOne.onconnection((client) => {
         
        })


        server.use(authentication("secret"))
        server.use(messaging)

        server.onconnection((socket) => {
            debugger
            expect(socket.username).toBe("mario")
            done()
        })


    })

})