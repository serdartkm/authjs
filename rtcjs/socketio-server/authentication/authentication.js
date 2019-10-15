const jwt = require('jsonwebtoken');

module.exports = async function (socket, next) {//
 
    let token = socket.handshake.query.token

    console.log("token---",token)///
    try {
        const decoded = await jwt.verify(token, process.env.secret)
        const { data } = decoded
        socket.username = data
        next()
    } catch (error) {
        next(error)
    }

}