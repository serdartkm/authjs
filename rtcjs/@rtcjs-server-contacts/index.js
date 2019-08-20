module.exports = function({  db, socket }) {
  socket.on("join",()=>{
    console.log("join---- inside contacts")
  })
  require('./getContacts')({db,socket})
  require('./findContact')({db,socket})
  require('./inviteContact')({db,socket})

 // require('./acceptContact')({db,socket})  
 // require('./blockContact')({db,socket})
 // require('./declineInvitation')({db,socket}) 
 //require('./archiveContact')({db,socket})
 //require('./deleteContact')(({db,socket}))
};
