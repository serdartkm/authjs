'use strict';
module.exports = function (socket,next) {
  console.log("socket registered.........ssssss",socket.name)
    socket.on("text_message", ( data) => {
   console.log("text message...",data)
    const { reciever, datetime, message } = data;

    socket.to(reciever).emit("text_message", {datetime,message,sender:"serdar"})

  }
  );
next()
}