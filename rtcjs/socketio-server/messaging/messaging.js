'use strict';
module.exports = function (socket, next) {

  console.log("message midllware-called-------")
  try {
    socket.on("text_message", (data) => {
        console.log("text message received")
      const { reciever, datetime, message } = data;

      socket.to(reciever).emit("text_message", { datetime, message, sender: socket.username })

    }
    );
    next()
  } catch (error) {
    next(error)
  }

}