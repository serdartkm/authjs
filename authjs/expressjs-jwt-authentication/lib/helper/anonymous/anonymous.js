const jwtEventEmitter = require('../jwtEventEmitter')

module.exports = function ({ expiresIn, secret, payload }) {
    return function anonymous(req, res) {
        try {
            jwtEventEmitter.requestToken({ expiresIn, secret, payload })
            jwtEventEmitter.responseToken((err, token) => {
                if (err) {
                    res.json({ err })
                }
                else {
                    res.json({ token })
                }
            })
        } catch (err) {
            res.json({ err })
        }
    }
}