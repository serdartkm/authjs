const jwtController = require('../../../event-bus/jwt-controller')
const errorTransformer =require ('../../../Utils/error-handlers/error-transformer')

module.exports = function anonymous(req, res, next) {
     
   
        const {username} =req.body
        const expiresIn ='1h'
        const secret ='anonymous'
        const  payload ={data:username}
        jwtController.requestToken({ expiresIn, secret, payload }, ({ error, token }) => {
     
            if (error) {
            
                console.log("e......",error)
                next(errorTransformer(error,'anonymous'))
            
            }
            else{
                res.json({ token, username})
            }
            
        })

}

