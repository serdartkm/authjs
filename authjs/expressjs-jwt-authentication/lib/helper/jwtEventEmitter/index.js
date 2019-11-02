

const jwt = require('jsonwebtoken');

module.exports = {
    requestToken: async ({ expiresIn, secret, payload }, cb) => {
        try {
            const token = await jwt.sign(payload, secret, { expiresIn })
            cb(null, token)
        } catch (err) {
            cb(err, null)
        }
    }
}