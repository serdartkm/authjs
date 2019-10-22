const jwt = require('jsonwebtoken');

module.exports =  function config(secret) {//
 
    return async function authentication(socket,next){
            debugger
        let token = socket.handshake.query.token
        try {
       
            const decoded = await jwt.verify(token,secret)
            const { data } = await decoded
      
           socket.username =    data
      
          next()
        } catch (err) {
      
            console.log("error>>>>",err );
            next(err)
        }

    }

}


