const appRoot = require('app-root-path');
const logger = require(appRoot + '/loggers/winston.js');
const eventBus = require('../../event-bus')
const errorTransformer =require ('../../Utils/error-handlers/error-transformer')
module.exports = {

    requestToken: ({ expiresIn, secret, payload }, cb) => {
        try {
        
            eventBus.once('response.jwt.token', (token) => {
                cb({error:null, token })
            })
            eventBus.once('response.jwt.error', (error) => {
             
          
                cb({error:errorTransformer(error,'requestToken'), token:null })
            })
            eventBus.emit('request.jwt.token', { expiresIn, secret, payload })
        } catch (error) {
          
         
            cb({error:errorTransformer(error,'requestToken'), token:null })
        }

    }
}