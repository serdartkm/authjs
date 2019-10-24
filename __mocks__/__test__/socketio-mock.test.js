


describe('socketio server mock', () => {
  
    beforeEach(() => {
     jest.resetModules()
    })

    it("two socket.io-clients connected to server", (done) => {

        let server = require('../socket.io')()
        let clientOne = require('../socket.io-client')("token", "one")
        let clientTwo = require('../socket.io-client')("token", "two")
        let spyOnClientOne = jest.spyOn(clientOne, 'on')
        server.on('connection', (socket) => {
            socket.emit("message", "hello" + socket.id)
        })

        clientOne.on('message', async (data) => {
            await expect(data).toBe("helloone")
        })
        expect(spyOnClientOne.mock.calls[0][0]).toBe('message')
        clientTwo.on('message', async (data) => {

            
            await expect(data).toBe("hellotwo")
            done()
        })

        clientOne.connect()
        clientTwo.connect()
    })

    it("message is sent between clients with the same room", (done) => {


        let server = require('../socket.io')()
        let clientOne = require('../socket.io-client')("token", "one")
        let clientTwo = require('../socket.io-client')("token", "two")
        let spyOnClientOne = jest.spyOn(clientOne, 'on')
        server.on('connection', async (socket) => {

            await socket.join("room-one")
            await socket.to('room-one').emit("message", "hello from socket" + socket.id)

        })

        clientOne.on('message', async (data) => {
            const d = await data
            await expect(d).toBe('hello from sockettwo')

        })
        clientTwo.on('message', async (data) => {
            const d = await data
            await expect(d).toBe('hello from socketone')

        })
        clientOne.connect()
        clientTwo.connect()

        done()

    
    })

})