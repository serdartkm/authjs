

    describe("socketio-server",()=>{
        
    
        it('meddlewares are added correctly',()=>{
            const socketioServer = require('../index')({},"mysecret")
              expect(socketioServer.stack.length).toBe(2)
              expect(socketioServer.stack[0].name).toBe("authentication")
              expect(socketioServer.stack[1].name).toBe("messaging")
          
        })
        
    })


