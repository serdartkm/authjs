'use strict';
module.exports = function room(socket, next) {

  try {

    if(socket.username=== undefined)
    throw Error("User name is undefined")
    socket.join(socket.username)
    next()
  debugger
  } catch (error) {
    debugger
    next(error)
  }

}