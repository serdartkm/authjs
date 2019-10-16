'use strict';
module.exports = function (socket, next) {
  try {
    socket.on("text_message", (data) => {

      const { reciever, datetime, message } = data;

      socket.to(reciever).emit("text_message", { datetime, message, sender: socket.username })

    }
    );
    next()
  } catch (error) {
    next(error)
  }

}