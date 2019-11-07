const jwt = require('jsonwebtoken');
module.exports =function(eventBus){
    eventBus.on('request.jwt.token', async ({ payload, secret, expiresIn }) => {
        try {
            const token = await jwt.sign(payload, secret, { expiresIn })
            debugger
            eventBus.emit('response.jwt.token', token)
        } catch (error) {
            eventBus.emit('response.jwt.error', error)
        }
    })
}