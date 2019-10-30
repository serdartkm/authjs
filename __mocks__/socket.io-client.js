'use strict';
const PubSub = require('pubsub-js')
const uniqid = require('uniqid')
const EventEmitter = require('events')
class SocketClient {

    constructor(token = "", id) {
        this.connected = false
        this.handshake = { query: { token } }
      
        if (id === undefined) {
            throw new Error("username undefined")
        }
        else {
            this.id = id
        }

    }

    onconnection=(cb)=>{
        let self =this
        PubSub.subscribe(`listening`, (msg, data) => {

            PubSub.publishSync('client', { id: this.id, handshake: this.handshake })
        })
        PubSub.subscribe(`connected${this.id}`,  (msg, data)=> {
            this.connected = true
            self.socket=data
     
          cb(self)
  
        })
    }

    on = (event, cb) => {
       
        PubSub.subscribe(`${event}${this.id}`,(msg,data)=>{
        debugger
            cb(data)
        })
    }



    emit  (event, data) {
        try {
         debugger
      this.socket.emit(event,data)
        } catch (error) {
       debugger
        }
    }

}

module.exports = function (token, username) {

    return new SocketClient(token, username)

}