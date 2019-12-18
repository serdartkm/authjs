 const socketServer =require('../rtcjs/nodejs-socketio-text-chat')

module.exports=(req,res)=>{
   
 socketServer(null,'anonymous')

}