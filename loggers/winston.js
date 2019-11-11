const {createLogger, format,transports} = require("winston")
const{combine,timestamp,label,prettyPrint} =format
const appRoot = require('app-root-path')
var options = {
    file: {
        level: 'error',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: "error",
        handleExceptions: true,
        json: true,
        colorize: true
    }
}

var logger = createLogger({
    level:'info',
    format:combine(
        format.json(),
        format.colorize(),
        label({label:"right meo!"}),
        timestamp(),
         prettyPrint()
        ),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false
})

logger.stream = {
    write: function (message, encoding) {
        logger.info(message)
    }
}

module.exports = logger