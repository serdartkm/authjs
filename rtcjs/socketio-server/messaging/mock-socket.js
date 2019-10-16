import PubSub from 'pubsub-js'
var uniqid = require('uniqid');

class SocketServer {
    constructor() {
        this.stack = []
  
    }
    on = (event, cb) => {
        PubSub.subscribe(event, (msg, data) => {
            if (event==="connection") {
                if (this.stack.length > 0) { 
                    this.stack.forEach(async(s) => {
                        console.log("midleware inv")
                      await  s(data,()=>{})
                       cb(data)
                        
                    })
                } else{
                    cb(data)
                }

            }
           else{
            cb(data)
           }
           
        })
    }

    use = (callback) => {
        this.stack.push(callback)
    }
}

class SocketClient {
    constructor(handshake = {}) {
        this.id = uniqid()
        this.socket = new Socket("socket", this, handshake)
        this.events = []
        this.rooms = []
        this.handshake = handshake

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

export {
    SocketClient,
    SocketServer
}