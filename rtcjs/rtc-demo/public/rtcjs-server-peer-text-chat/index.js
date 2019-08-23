module.exports = function({ socket, users, db }) {
  socket.on("join",()=>{
    console.log("join---- inside text chat")
  })
  socket.on("text_message", async (data) => {
    const {targetName,message,name}= data;
    console.log("message-----", message, name, targetName);

    if (users[targetName]) {
        console.log("user exists***********",targetName)
    //  var id = users[targetName].id;
         socket.to(targetName).emit("text_message",data)

    } else {
      //savedata to db for later resubmit
      
    }
  });

  socket.on("join", (name, fn) => {
    console.log("join recieved from", name);
    socket.join(name, () => {
      socket.to(name).emit("joined", `Hi ${name} you are joined`);
    });
  });

  socket.on("leave", (name, fn) => {
    console.log("join recieved from", name);
    socket.leave(name, () => {
      socket.to(name).emit("left room", `Hi ${name} you are joined`);
    });
  });
};
