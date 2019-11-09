const EventEmitter = require('events')
//const mailingProcessor = require('./event-processors/mailing-processor')
const jwtProcessor = require('./event-processors/jwt-processor')
module.exports = function () {
    const eventBus =     new EventEmitter()
  
  //  eventBus.on('request.jwt.token', (data) => {
        jwtProcessor(eventBus)
       // eventBus.emit('request.jwt.token', data)
   // })

    // eventBus.on('request.mailing', (data) => {
    //     mailingProcessor(eventBus)
    //     eventBus.emit('request.mailing', data)
    // })


return eventBus

}()