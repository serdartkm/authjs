'use strict';
module.exports = function (socket, next) {

  socket.on("text_message", (data) => {

    const { reciever, datetime, message } = data;

    socket.to(reciever).emit("text_message", { datetime, message, sender: socket.username })

  }
  );
  next()
}