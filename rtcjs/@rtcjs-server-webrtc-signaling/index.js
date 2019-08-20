

module.exports = function({users,db,socket}){
  
   socket.on('offer',(message)=>{
    console.log("offer---",message)
  const {targetName}= message
      socket.to(targetName).emit("offer",message)
   })
   socket.on('answer',(message)=>{

     const {targetName}= message
    socket.to(targetName).emit("answer",message)
   })
   socket.on('candidate',(message)=>{
 
    const {targetName}= message
    socket.to(targetName).emit("candidate",message)
   })

}