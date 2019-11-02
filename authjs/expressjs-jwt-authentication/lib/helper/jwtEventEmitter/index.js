
const EventEmitter = require('events')
const jwt = require('jsonwebtoken');

class JWTEventEmitter extends EventEmitter {
 
}

module.exports = {
    requestToken: ({ expiresIn, secret, payload }, cb) => {
        if (expiresIn === undefined | secret === undefined | payload === undefined)
        {
            cb(new Error('undefined arguments'),null)
        }
             else{
                const jwtEventEmitter = new JWTEventEmitter()
    
                jwtEventEmitter.on('request_jwt',async (data) => {
                 
                   const { expiresIn, secret, payload } = data
                   try {
                 
                       const token = await jwt.sign(payload, secret,  { expiresIn })
                       cb(null, token)
                   } catch (err) {
                    
                       cb(err, null)
                   }
               })
               jwtEventEmitter.emit('request_jwt', { expiresIn, secret, payload })
             }   
    }
}