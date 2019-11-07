const jwtController = require('../../../event-bus/jwt-controller')
const debug =require('debug')('jwt:anonymous')
module.exports =  function anonymous(req, res) {
        try {
            const {expiresIn='1h', secret ='dragonfly', payload}  =req.body

            debug('req.body.secret',secret)
            debug('req.body.expiresIn',expiresIn)
            debug('req.body.payload',payload)
            
            jwtController.requestToken({ expiresIn, secret, payload }, ({ err, token }) => {
                debugger
                if (err) {
                    debugger
                    res.json({ err })
                }
                else {
                    debugger
                    res.json({ token })
                }
            })
        } catch (err) {
            res.json({ err })
        }
    }

