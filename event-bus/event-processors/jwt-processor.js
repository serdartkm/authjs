const jwt = require('jsonwebtoken');
const errorTransformer =require ('../../Utils/error-handlers/error-transformer')
module.exports =function jwtProcessor(eventBus){
    eventBus.on('request.jwt.token', async ({ payload, secret, expiresIn }) => {
        try {
            const token = await jwt.sign(payload, secret, { expiresIn })
        
            eventBus.emit('response.jwt.token', token)
        } catch (error) {
   
            const modifiedError = errorTransformer(error,'jwtProcessorr')
             console.log('modifiedError',modifiedError)
            eventBus.emit('response.jwt.error',modifiedError)
        }
    })
}