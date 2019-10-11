module.exports = function (socket) {

    socket.on("text_message", ( data) => {
    console.log( "tttt....",data)
    const { receiver, datetime, message } = data;
   // socket.to(receiver).emit("text_message", {datetime,message})
  }
  );

}