
const anonymous =require('./anonymous/anonymous')
const debug =require('debug')('jwt:url')
module.exports =function(req,res, next){

    debug('req.url',req.url)
        console.log("anonymous route match")
        req.app.post('/anonymous',anonymous)
       
        next()
    
  
}