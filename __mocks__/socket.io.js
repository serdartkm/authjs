'use strict';
const PubSub = require('pubsub-js')

let interval = null

class SocketServer {
    constructor() {
        this.stack = []
        PubSub.subscribe(`connect`, async (msg, data) => {
            const { id, handshake } = data
            const socket = new Socket(id, handshake)
            if (this.stack.length > 0) {
                for (const fn of this.stack) {
                    await fn(socket, () => { })
                }
                PubSub.publishSync('connection', socket)
            }
            else {
                PubSub.publishSync('connection', socket)
            }
        })
    }


    use = (callback) => {
        this.stack.push(callback)
    }

    on = (event, cb) => {
        if (event === "connection") {
            PubSub.subscribe(event, (msg, data) => {
                cb(data)
            })
        }
    }
}

class Socket {
    constructor(id, handshake) {
        this.id = id
        this.handshake = handshake
        this.rooms = []
    }

    on = (event, cb) => {
   
        //subscribtion for messages recived from client
        PubSub.subscribe(`${id}${event}`, (msg, data) => {
            cb(data)
        })
        //subscribe to events sent to room and forward to socket.io-client

    }

    join = (joinedroom) => {
        const room = room
        const socketid =this.id
    
        PubSub.subscribe('room', (msg, data) => {
            const { room, id, userdata,event } = data
        
            if (room === joinedroom && id !== socketid)
      
                PubSub.publishSync(`${socketid}${event}`, userdata)
        })
    }

    to = (room) => {
        //emits message to all clients joined to room
        return {
            emit: (event, userdata) => {
              
                const data = { userdata, id: this.id, room, event }
            
                //send message to specific room
                PubSub.publishSync(`room`, data)
            }
        }
    }

    emit = (event, data) => {
        //emits message to the socket owner client
        PubSub.publishSync(`${this.id}${event}`, data)
    }
}

module.exports = function () {
    return new SocketServer()
}