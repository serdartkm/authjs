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
        for (const room of this.rooms) {
            debugger
            //subscribe to messages sent to room
            PubSub.subscribe(`${room}${event}`, (msg, data) => {
                debugger
                //forward message to frontend client
                PubSub.publishSync(`${id}${event}`, data)
            })
        }

        //subscribtion for messages recived from client
        PubSub.subscribe(`${id}${event}`, (msg, data) => {
            cb(data)
        })
        //subscribe to events sent to room and forward to socket.io-client

    }

    join = (room) => {
        this.rooms.push(room)
    }

    to = (room) => {
        //emits message to all clients joined to room
        return {
            emit: (event, data) => {
                debugger
                //send message to specific room
                PubSub.publishSync(`${room}${event}`, data)
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