const jwtController = require('../../../event-bus/jwt-controller')
const uniqid =require('uniqid')
module.exports = function anonymous(req, res, next) {
     

        const expiresIn ='1h'
        const secret ='anonymous'
        const  payload ={username: uniqid()}
        jwtController.requestToken({ expiresIn, secret, payload }, ({ error, token }) => {
     
            if (error) {
                debugger
                console.log("e......",error)
                next(errorTransformer(error,'anonymous'))
            
            }
            else{

                debugger
                res.json({ token })
            }
            
        })

}

