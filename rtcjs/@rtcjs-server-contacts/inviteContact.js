module.exports = function({ socket, db, users }) {
  const userName = socket.userName;
  socket.on("invitation", async contact => {
    //check whether the user is online. if so then emit the invitation
    if (users[contact]) {
      socket.to(contact).emit("invitation", { contact });
    } else {
  //Save invitation to database for later emit  if the user is currently offline
      try {
       await db
          .collection("contacts")
          .findOneAndUpdate({ userName }, { $push: { invitations: contact } });
    
      } catch (error) {
        console.log("mdb contacts error", error);
      }
    }
  });

  socket.on("join",async()=>{
    //when user joins roon check whether he has invitations to be received and
    //if so emit the one by one
      let invitationQuery = await db.collection("contacts").findOne({userName})
      let invitations = invitationQuery && invitationQuery.invitations !==undefined &&invitationQuery.invitations
      if(invitations){
        invitations.foreach((inv)=>{
          socket.to(userName).emit("delayed_invitation",inv)
        })
      }
    try {
      
    } catch (error) {
      console.log("error",error)
    }
  })

  socket.on("delayed_invitation", async(contact)=>{
     //after user confirms about reciet of messages delete them from database
  try {
    await db.collection("contacts").findOneAndUpdate({userName},{$pull:{contact:{$eq: contact}}})
  } catch (error) {
    console.log("error",error)
  }
  })
};
