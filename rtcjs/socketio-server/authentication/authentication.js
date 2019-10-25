const jwt = require('jsonwebtoken');

module.exports = function config(secret) {

    return async function authentication(socket, next) {

        try {


            let token = socket.token
            const decoded = await jwt.verify(token, secret)
            const { data } = await decoded

            socket.username = data

            next()
        } catch (err) {
            const error = err
            next(err)

        }

    }

}


