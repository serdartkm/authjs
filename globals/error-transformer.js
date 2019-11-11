
const logger = require('../loggers/winston')
module.exports =  function errorTransformer(error, functionName) {
    debugger
    try {
        debugger
        if (!error instanceof Error || functionName === undefined) {
            throw new Error('errorPropagator: argument error')
        }
        if (error.chains !==undefined && error.chains.length > 0) {
            debugger
             error.chains = [...error.chains, functionName]
             return error
        }

        else {
                debugger
             error.chains = [functionName]
             return error
        }

    } catch (error) {

        logger.error({ origin: 'errorPropagator', stack: error })

    }



}