
const jwt = require('jsonwebtoken')

describe('socketio server mock', () => {
  
    beforeEach(() => {
     jest.resetModules()
    })

    it.only("two socket.io-clients connected to server", async (done) => {
        const token = await jwt.sign({ data: "mario" }, "secret", { expiresIn: '1h' })
      
        debugger
   
        let server =  require('../socket.io')()()
        let clientOne = require('../socket.io-client')( token,"one")
        debugger
      //  let clientTwo = await require('../socket.io-client')( "two")
       // let spyOnClientOne = jest.spyOn(clientOne, 'on')//
    //    clientOne.on('connection',  (data) => {
    //     debugger
    //    //   expect(data).toBe("helloone")
    //  })
        server.on('connection',  (socket) => {
            debugger
          //  socket.emit("message", "hello" + socket.id)
      
        })
    
       //  clientOne.connect()
      //  expect(spyOnClientOne.mock.calls[0][0]).toBe('message')
        //  clientTwo.on('message', async (data) => {

            
        //   //   expect(data).toBe("hellotwo")
        
        // })
        done()
    })

    it("message is sent between clients with the same room", (done) => {
        let server = require('../socket.io')()()
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