

    describe("socketio-server",()=>{
        it('meddlewares are added correctly',()=>{
           
                const socketioServer = require('../index')({},"secret")
      
                 expect(socketioServer.stack.length).toBe(3)
                  expect(socketioServer.stack[0].name).toBe("authentication")
                 expect(socketioServer.stack[1].name).toBe("room")
                 expect(socketioServer.stack[2].name).toBe("messaging")
           
        })
        
    })


