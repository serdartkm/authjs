'use strict';
module.exports = function (socket) {

    socket.on("text_message", ( data) => {
   
    const { reciever, datetime, message } = data;
    socket.to(reciever).emit("text_message", {datetime,message,reciever})

  }
  );

}