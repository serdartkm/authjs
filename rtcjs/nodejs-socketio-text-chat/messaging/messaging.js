'use strict';
module.exports = function messaging(socket, next) {

  try {

    if(socket.username=== undefined)
 
    throw Error("User name is undefined")
    socket.on("text_message", (data) => {
      debugger
      const { reciever, datetime, message } = data;
   debugger
      socket.to(reciever).emit("text_message", { datetime, message, sender: socket.username })

    }
    );
    next()
  debugger
  } catch (error) {
    debugger
    next(error)
  }

}