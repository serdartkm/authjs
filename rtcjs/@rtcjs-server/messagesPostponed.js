module.exports =async function({socket,db,name}){
    let user = null;
    //send to the connected client waiting messages
    try {
        user = await db.collection("messages").findOne({ name });
        //sent to contacts online statechange
        if (user !== null && user.messages !== null) {
          const messages = user;
          socket.to(name).emit("delayed_messages", messages);

        }
      } catch (error) {
        console.log("mdb contacts error", error);
      }

      socket.on("delayed_messages_recieved", async()=>{

        try {
           await db.collection("messages").findAndUpdate({ name },{$unset:{messages:""}});
            //sent to contacts online statechange
            if (user !== null && user.messages !== null) {
              const messages = user;
          
            }
          } catch (error) {
            console.log("mdb contacts error", error);
          }
    
      })
    
}