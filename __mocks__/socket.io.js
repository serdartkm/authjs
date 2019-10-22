'use strict';
const PubSub = require('pubsub-js')

let interval = null

class SocketServer {
    constructor() {
        this.stack = []

        PubSub.subscribe(`connect`, async (msg, data) => {
            debugger
            const { id, handshake } = data
            const socket = new Socket(id, handshake)
            if (this.stack.length > 0) {
                debugger
                for (const fn of this.stack) {
                    await fn(socket, () => { })
                }

                PubSub.publishSync('connection', socket)
            }

            else {
                debugger
                PubSub.publishSync('connection', socket)
            }
        })

        interval = setInterval(() => {
            debugger
            PubSub.publishSync(`listening`, `listening on port 123`)
        }, 0)
    }


    use = (callback) => {


        this.stack.push(callback)
    }

    on = (event, cb) => {
        if (event === "connection") {
            debugger
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


    }

    on = (event, cb) => {
        //subscribtion for messages recived from client
        PubSub.subscribe(`${id}${event}`, (msg, data) => {
            cb(data)
        })

    }

    join = (room) => {
        PubSub.subscribe(`${room}${event}`, (msg, data) => {
            //sends messages recieved from joined root socket client
            PubSub.publishSync(`${this.id}${event}`, data)
        })
    }

    to = (room) => {
        //emits message to all clients joined to room
        return {
            emit: (event, data) => {
                PubSub.publishSync(`${room}${event}`, data)
            }
          
        }
    }

    emit=(event, data)=>{
        //emits message to the socket owner client
        PubSub.publishSync(`${this.id}${event}`, data)
    }

}

module.exports = function () {
    return new SocketServer()
}