const EventEmitter = require('events')
const jwt = require('jsonwebtoken');

module.exports = function () {
    const eventBus = new EventEmitter()
        .on('request.jwt.token', async ({ payload, secret, expiresIn }) => {
            try {
                const token = await jwt.sign(payload, secret, { expiresIn })
                debugger
                eventBus.emit('response.jwt.token', token)
            } catch (error) {
                eventBus.emit('response.jwt.error', error)
            }
        })
    return eventBus
}()