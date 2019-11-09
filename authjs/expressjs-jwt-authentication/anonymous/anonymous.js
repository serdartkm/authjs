const jwtController = require('../../../event-bus/jwt-controller')
module.exports =  function anonymous(req, res, next) {
        try {
            const {expiresIn='1h', secret ='dragonfly', payload}  =req.body
            jwtController.requestToken({ expiresIn, secret, payload }, ({error, token }) => {
                console.log('requestToken called.....')
                if(error){
                    error.chains = [...error.chains, 'anonymous']
                    console.log('chains------,', error.chains)
                   next(error)
                }
                    res.json({ token })
            })
        } catch (error) {
            error.chains = [...error.chains, 'anonymous']
            console.log('chains------,', error.chains)
            next(error)
        }
    }

