
const eventBus = require('../../event-bus')
module.exports = {
    requestToken:  ({ expiresIn, secret, payload }, cb) => {
        try {
            debugger
            eventBus.on('response.jwt.token', (token) => {
                debugger
                cb({error:null, token})
            })
            eventBus.on('response.jwt.error', (error) => {
                debugger
                cb({error,token:null })
            })
            debugger
            eventBus.emit('request.jwt.token', { expiresIn, secret, payload })  
        } catch (error) {
            debugger
            cb({error,token:null })
        }
     
    }
}