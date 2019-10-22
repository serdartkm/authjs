'use strict';
module.exports =  function messaging(socket, next) {

  try {
    debugger
    socket.on("text_message", (data) => {
        console.log("text message received")
      const { reciever, datetime, message } = data;

      socket.to(reciever).emit("text_message", { datetime, message, sender: socket.username })

    }
    );
    next()
  } catch (error) {
    debugger
    next(error)
  }

}