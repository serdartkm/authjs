
const jwt = require('jsonwebtoken')
const messaging = require('../../rtcjs/socketio-server/messaging/messaging')
const authentication = require('../../rtcjs/socketio-server/authentication/authentication')
describe('socketio server mock', () => {

    beforeEach(() => {
        jest.resetModules()
    })

    it("two socket.io-clients connected to server", async (done) => {
        const token = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
        let server = require('../socket.io')()()
        let clientOne = require('../socket.io-client')(token, "one")
        let clientTwo = require('../socket.io-client')(token, "two")


        let spyOnMessageOne = jest.fn()
        let spyOnMessageTwo = jest.fn()
        let spyOnServer = jest.spyOn(server, 'on')
        clientOne.on('message', spyOnMessageOne)
        clientTwo.on('message', spyOnMessageTwo)
        server.on('connection', async (socket) => {
           await socket.emit("message", "hello" + socket.id)

            expect(spyOnMessageTwo).toHaveBeenCalledWith("hellotwo")
            expect(spyOnMessageOne).toHaveBeenCalledWith("helloone")
        })

        expect(spyOnServer.mock.calls[0][0]).toBe("connection")
   

        done()
    })

    it("message is sent between clients within the same room", async (done) => {
        const token = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
        let server = require('../socket.io')()()
        let clientOne = require('../socket.io-client')(token, "one")
        let clientTwo = require('../socket.io-client')(token, "two")

        let spyOnServer = jest.spyOn(server, 'on')

        let spyOnMessageOne = jest.fn()
        let spyOnMessageTwo = jest.fn()
        clientOne.on('message', spyOnMessageOne)
        clientTwo.on('message', spyOnMessageTwo)
        server.on('connection', async (socket) => {
            let spyOnTo = jest.spyOn(socket, 'to')
            let spyOnJoin = jest.spyOn(socket, 'join')

            debugger
            await socket.join("room-one")
            await socket.to('room-one').emit("message", "hello from socket" + socket.id)


            expect(spyOnTo.mock.calls[0][0]).toBe("room-one")
            expect(spyOnJoin.mock.calls[0][0]).toBe("room-one")
            expect(spyOnMessageOne).toHaveBeenCalledWith("hello from sockettwo")
            expect(spyOnMessageTwo).toHaveBeenCalledWith("hello from socketone")

        })


        expect(spyOnServer.mock.calls[0][0]).toBe("connection")
        done()
    })

    it("testing middleware registration in right order",async(done)=>{
        const token = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
        let server = require('../socket.io')()()
        let clientOne = require('../socket.io-client')(token, "one")
        let clientTwo = require('../socket.io-client')(token, "two")
  
        server.use(authentication("secret"))
        server.use(messaging)

        server.on("connection",(socket)=>{
            debugger
             expect(socket.username).toBe("mario")
             done()
        })
     
    })

})