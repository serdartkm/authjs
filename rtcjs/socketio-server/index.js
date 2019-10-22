const io = require('socket.io')
const messaging = require('./messaging/messaging')
const authentication = require('./authentication/authentication')
module.exports = function (server) {
  console.log("middlewares registered")
   const socketServer = io(server)
   socketServer.use(authentication)
   socketServer.use(messaging)
return socketServer
//
}