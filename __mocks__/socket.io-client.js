'use strict';
import PubSub from 'pubsub-js'
class SocketClient {
    constructor(handshake = {}) {
      
        this.socket = new Socket("socket", this, handshake)
        this.events = []
        this.rooms = []
        this.handshake = handshake
   PubSub.subscribe('listening', (msg, data)=>{
     //  console.log("LISTENING RECIVED")
    PubSub.publishSync("connection", this.socket)
  //  console.log("CONNECTION TO SERVER SENT")
    PubSub.unsubscribe('listening')
   })
    }
    connect = () => {
        PubSub.publishSync("connection", this.socket)
        return this
    }

    on = (event, cb) => {
    
        PubSub.subscribe(`socket${event}`, (msg, data) => {
            cb(data)

        })

        if (this.rooms.length > 0) {
            this.rooms.forEach(r => {
                PubSub.subscribe(`${r}${event}`, (msg, data) => {
                    cb(data)
                })
            })
        }
    }

    emit = (event, data) => {

        PubSub.publishSync(`${event}`, data)
    }
    
    join = (room) => {

        this.rooms.push(room)

    }
}
//
class Socket {
    constructor(name, client, handshake) {
        this.name = name
        this.client = client,
            this.handshake = handshake
    }
    to = (room) => {

        return {
            emit: (event, data) => {
                PubSub.publishSync(`${room}${event}`, data)
            },
            to: this.to
        }
    }
    on = (event, cb) => {

        PubSub.subscribe(`${event}`, (msg, data) => {
            cb(data)
        })
    }

    emit = (event, data) => {

        PubSub.publishSync(`socket${event}`, data)
    }

    join = (room) => {
        this.client.join(room)
    }
}

module.exports = function(handshake){

    return new SocketClient(handshake)
}