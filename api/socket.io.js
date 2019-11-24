 const socketServer =require('../rtcjs/nodejs-socketio-text-chat')

module.exports=(req,res)=>{
    // res.json({message:"hello from socket.io"})
 socketServer(null,'anonymous')
}