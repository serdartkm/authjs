
module.exports = function({ MESSAGE_TYPE, contact, socket, db, users }) {
    const userName = socket.userName;
    socket.on(MESSAGE_TYPE,(contact)=>{
    
        if(users[contact]){
    
        }
    
    })

    //check whether the user is online. if so emit acceptance message
    //if user is offline save acceptance for later submittion
    //WHEN USER THE USER REJOINS THE ROOM 
    // check whether he has acceptance messages to be recieved. if so send
    // one by one
   
    // Afther _DELAYED_ACCEPTANCE message delete acceptance messages from database

}//---***=====***---//