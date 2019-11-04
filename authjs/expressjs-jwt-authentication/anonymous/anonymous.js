const jwtController = require('../../../event-bus/jwt-controller')

module.exports =  function anonymous(req, res) {
        try {
            const {expiresIn, secret, payload}  =req.body
            jwtController.requestToken({ expiresIn, secret, payload }, ({ err, token }) => {
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

