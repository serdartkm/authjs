
const anonymous =require('./anonymous/anonymous')

module.exports = function (req,res, next){


    console.log("anonymous route match")
        req.app.post('/anonymous',anonymous)


}