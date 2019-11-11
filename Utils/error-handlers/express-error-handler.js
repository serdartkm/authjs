
const logger =reqlib('/loggers/winston.js')
module.exports =function(error,req,res,next){
console.log("ERRORS.....",error)
const chain =error.chains.reverse().join('.')
logger.error({origin:chain, stack:error.stack})

}