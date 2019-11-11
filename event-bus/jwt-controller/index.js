const appRoot = require('app-root-path');
const logger = require(appRoot + '/loggers/winston.js');
const eventBus = require('../../event-bus')

module.exports = {

    requestToken: ({ expiresIn, secret, payload }, cb) => {
        try {
            debugger
            eventBus.on('response.jwt.token', (token) => {
                cb({error:null, token })
            })
            eventBus.on('response.jwt.error', (error) => {
                debugger
          
                cb({error:errorTransformer(error,'requestToken'), token:null })
            })
            eventBus.emit('request.jwt.token', { expiresIn, secret, payload })
        } catch (error) {
            debugger
         
            cb({error:errorTransformer(error,'requestToken'), token:null })
        }

    }
}