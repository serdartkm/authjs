const jwt = require('jsonwebtoken');

module.exports = function config(secret) {

    return async function authentication(socket, next) {
        debugger
        try {
            let token = socket.handshake.query.token
            const decoded = await jwt.verify(token, secret)
            const { data } = await decoded
            socket.username = data
           // socket.join(data)
            next()
     debugger
        } catch (err) {
            debugger
            const error = err
            next(err)
            
        }

    }

}


