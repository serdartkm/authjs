const EventEmitter = require('events').EventEmitter
const jwt = require('jsonwebtoken');

class JWTEventEmitter extends EventEmiter {

    constructor() {
        super()
    }

    requestToken = ({ expiresIn, secret, payload }) => {
        if(expiresIn ===undefined | secret===undefined | payload===undefined)
        throw new Error ('undefined arguments')
        emit('request', { expiresIn, secret, payload })
    }

    responseToken = async(cb) => {
        on('request',  (data) => {
            const { expiresIn, secret, payload } = data
            try {
                const token = await jwt.sign(payload, secret, { expiresIn })
                cb(null, token)
            } catch (error) {
                cb(err, null)
            }
        })
    }

    
}

export default JWTEventEmitter