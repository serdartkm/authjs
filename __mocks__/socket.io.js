'use strict';
const PubSub = require('pubsub-js')
const EventEmitter = require('events')
class SocketServer {
    constructor() {
        this.connected = false
        this.rooms = []
        this.stack = []
        this.sockets = []
        PubSub.subscribe(`client`, (msg, data) => {
            this._initConnection(data)
        })
    }
    _initConnection = async (data) => {

        const { id, handshake } = data
        const socket = new Socket(id, handshake)

        if (this.stack.length > 0) {
            for (const fn of this.stack) {
                await fn(socket, () => { })
            }

            PubSub.publishSync(`connected${id}`, socket)
            PubSub.publishSync(`connection`, socket)
            this.sockets.push(socket)

        }
        else {

            PubSub.publishSync(`connected${id}`, socket)
            PubSub.publishSync(`connection`, socket)
        }
    }

    use = (callback) => {
        this.stack.push(callback)
    }

    onconnection = (cb) => {

        PubSub.subscribe('connection', (msg, data) => {

            cb(data)
        })

        PubSub.publishSync("listening", "")
    }
}

class Socket extends EventEmitter {
    constructor(id, handshake) {
        super()
        this.id = id
        this.handshake = handshake
        this.rooms = []
 
    }

    join = (room) => {
        let self =this
        this.rooms.push(room)
        PubSub.subscribe(room, (msg, data) => {
       
            const { event, message, id } = data
            
            if (id !== self.id) {
             
                PubSub.publishSync(`${event}${this.id}`,message)
           
            }
     
        })
    }

    to = (room) => {
        //emits message to all clients joined to room
        return {
            emit: (event, data) => {
                debugger
                //send message to specific room
                PubSub.publishSync(room, { message: data, event, id: this.id })
                debugger
            }
        }
    }

 

}

module.exports = function () {
    return  new SocketServer()
}