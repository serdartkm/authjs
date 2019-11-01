
const io = require('socket.io')
const messaging = require('./messaging/messaging')
const authentication = require('./authentication/authentication')
const room =require('./room/room')
module.exports = function socketioserver(server, secret = "secret") {

  const socketServer = io(server)

  socketServer.use(authentication(secret))
  socketServer.use(room)
  socketServer.use(messaging)
  return socketServer

}
