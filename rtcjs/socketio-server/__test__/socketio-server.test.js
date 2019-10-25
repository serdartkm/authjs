




    describe("socketio-server",()=>{

        it('use function is called',()=>{
            debugger
         
            const socketioServer = require('../index')({},"mysecret")
            const spyOnUse =jest.spyOn(socketioServer,'use')
        })
    })


