const appRoot = require('app-root-path');
const logger = require(appRoot + '/loggers/winston.js');
const eventBus = require('../../event-bus')

module.exports = {
    requestToken: ({ expiresIn, secret, payload }, cb) => {
        try {
            eventBus.on('response.jwt.token', (token) => {
                cb({error:null, token })
            })
            eventBus.on('response.jwt.error', (error) => {
                error.chains = [...error.chains, 'requestToken']
                console.log('chains------,', error.chains)
                throw error
               // cb({error, token:null })
            })
            eventBus.emit('request.jwt.token', { expiresIn, secret, payload })
        } catch (error) {
            error.chains = [...error.chains, 'requestToken']
            console.log('chains------,', error.chains)
            throw error
         //   cb({error, token:null })
        }

    }
}