
const anonymous =require('./anonymous/anonymous')

module.exports = function (req,res, next){

debugger
    console.log("anonymous route match")
        req.app.post('/anonymous',anonymous)
        debugger

}