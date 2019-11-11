const jwt = require('jsonwebtoken');
module.exports =function jwtProcessor(eventBus){
    eventBus.on('request.jwt.token', async ({ payload, secret, expiresIn }) => {
        try {
            const token = await jwt.sign(payload, secret, { expiresIn })
            debugger
            eventBus.emit('response.jwt.token', token)
        } catch (error) {
            debugger
            const modifiedError = errorTransformer(error,'jwtProcessorr')
             console.log('modifiedError',modifiedError)
            eventBus.emit('response.jwt.error',modifiedError)
        }
    })
}