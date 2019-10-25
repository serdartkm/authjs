debugger
const io = require('socket.io')
const messaging = require('./messaging/messaging')
const authentication = require('./authentication/authentication')

module.exports = function socketioserver(server,secret="secret") {


  debugger
  const socketServer =   io(server)()
  socketServer.use(authentication(secret))
  socketServer.use(messaging)
  return socketServer
  

}