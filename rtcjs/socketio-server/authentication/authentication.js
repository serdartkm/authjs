const jwt = require('jsonwebtoken');

module.exports = async function (socket, next) {//
     console.log("auth middleware called")
    let token = socket.handshake.query.token
    try {
        const decoded = await jwt.verify(token, process.env.secret)
        const { data } = decoded
        socket.username = data
     
        next()
    } catch (err) {
        console.log("error>>>>",err );
        next(err)
    }

}