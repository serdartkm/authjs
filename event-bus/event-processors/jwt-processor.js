const jwt = require('jsonwebtoken');
module.exports =function jwtProcessor(eventBus){
    eventBus.on('request.jwt.token', async ({ payload, secret, expiresIn }) => {
        try {
            const token = await jwt.sign(payload, secret, { expiresIn })
            debugger
            eventBus.emit('response.jwt.token', token)
        } catch (error) {
            error.chains =['jwtProcessor']
            console.log('chains------,',error.chains)
            eventBus.emit('response.jwt.error', error)
        }
    })
}