
const io = require('socket.io')
const messaging = require('./messaging/messaging')
const authentication = require('./authentication/authentication')
const room = require('./room/room')
module.exports = async function socketioserver(server, secret = "secret") {

  const socketServer = await io(server)
  await socketServer.use(authentication(secret))
  await socketServer.use(room)
  await socketServer.use(messaging)


  return socketServer

}
