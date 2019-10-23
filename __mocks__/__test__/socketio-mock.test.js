import socketio from '../socket.io'
import io from '../socket.io-client'



describe('socketio server mock', () => {



    it("two socket.io-clients connected to server", async (done) => {

        const server = socketio()
        const clientOne = io("token", "one")
        const clientTwo = io("token", "two")
        const spyOnClientOne = jest.spyOn(clientOne, 'on')
        server.on('connection', (socket) => {
            socket.emit("message", "hello" + socket.id)
        })

        clientOne.on('message', async (data) => {
            await expect(data).toBe("helloone")
        })
        expect(spyOnClientOne.mock.calls[0][0]).toBe('message')
        clientTwo.on('message', async (data) => {

            //
            await expect(data).toBe("hellotwo")
            done()
        })

        clientOne.connect()
        clientTwo.connect()

    })

    it.only("message is sent between clients with the same room", () => {
        const server = socketio()
        const clientOne = io("token", "one")
        const clientTwo = io("token", "one")
        server.on('connection', (socket) => {
           
              socket.join("room-one")
         
              socket.to('room-one').emit("message","hello from socket"+ socket.id)
              socket.on('message',(data)=>{
                debugger
            })
              
        })

        clientOne.on('message',(data)=>{
            debugger
        })

        clientOne.connect()
        
    })

})