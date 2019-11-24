
const appRoot = require('app-root-path');

const errorTransformer =require(`${appRoot}/Utils/error-handlers/error-transformer.js`)
const io = require('socket.io')
const messaging = require('./messaging/messaging')
const authentication = require('./authentication/authentication')
const room = require('./room/room')

module.exports = function nodeJsSocketioTextChat(server, secret = "secret") {
  try {

    const socketServer = server ===null ? io().listen(3001) :io(server)
    socketServer.use(authentication(secret))
    socketServer.use(room)
    socketServer.use(messaging)
    return socketServer

  } catch (error) {
    errorTransformer(error,'nodeJsSocketioTextChat')

  }


}
