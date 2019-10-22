
(async ()=>{
  const  server =require( '../../__mocks__/socket.io')()
debugger
const authMiddleware =require('../../rtcjs/socketio-server/authentication/authentication')
const messiddleware =require('../../rtcjs/socketio-server/messaging/messaging')
const jwt = require('jsonwebtoken')
const token = await jwt.sign({ data: "aman" }, "mysecret", { expiresIn: '1h' })
const client =require('../../__mocks__/socket.io-client')(token)
  server.listen()
  client.connect()

  server.use(authMiddleware("mysecret"))
  server.use(messiddleware)
})()
