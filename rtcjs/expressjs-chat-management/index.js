module.exports = function({ socketServer, socketType="socketio" }) {

 
      if(socketType==="socketio"){

     
     
      }



     if(socketType ==="ws"){
       socketServer.on('connection',(socket)=>{

        socket.onmessage=(data)=>{
          const message =JSON.parse(data)
          const username =message
          switch(message.type){
            case "text_message":
              socketServer.clients[username]
          }
        }

       })
     }
    
  };
  

  //   socket.to(name).emit("left room", `Hi ${name} you are joined`);