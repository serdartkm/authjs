

module.exports = function ({ users, db, socket }) {

   socket.on('offer', (message) => {
      const { targetName } = message
      socket.to(targetName).emit("offer", message)
   })
   socket.on('answer', (message) => {
      const { targetName } = message
      socket.to(targetName).emit("answer", message)
   })
   socket.on('candidate', (message) => {

      const { targetName } = message

      socket.to(targetName).emit("candidate", message)
   })
   socket.on('close', (message) => {
      console.log("close message revived", message)
      const { targetName } = message

      socket.to(targetName).emit("close", message)
   })
}