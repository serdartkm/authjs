'use strict';
module.exports = function messaging(socket, next) {

  try {
  debugger
    if(socket.username=== undefined)
 
    throw Error("User name is undefined")
    socket.on("text_message", (data) => {
      debugger
      const { reciever, datetime, message } = data;

      socket.to(reciever).emit("text_message", { datetime, message, sender: socket.username })

    }
    );
    next()
  
  } catch (error) {
    
    next(error)
  }

}