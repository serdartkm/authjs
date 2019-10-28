'use strict';
const PubSub = require('pubsub-js')

class SocketServer {
    constructor() {
        this.rooms=[]
        this.stack = []
        PubSub.subscribe(`connect`, (msg,data)=>{  
            this._initConnection(data)
        })
    }
    _initConnection = async(data)=>{
            const { id, handshake } = data
            const socket = new Socket(id, handshake)
            if (this.stack.length > 0) {
                for (const fn of this.stack) {
                    await fn(socket, () => { })
                }
             
                PubSub.publishSync(`connection`, socket)
            }
            else {
                PubSub.publishSync(`connection`, socket)
                PubSub.publishSync(`connection${id}`, socket)
            }
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
        PubSub.publishSync(`server`, "") //server last
    }
}

class Socket {
    constructor(id, handshake) {
        this.id = id
        this.handshake = handshake
        this.rooms = []

        PubSub.subscribe(`connection`, (msg, data) => {

          if(data.id===this.id){
            PubSub.publishSync(`connection${this.id}`, data)
          }
        })
    }

    on = (event, cb) => {
        debugger
        //subscribtion for messages recived from client
        PubSub.subscribe(`${event}${id}`, (msg, data) => {
            debugger
            cb(data)
        })
        //subscribe to events sent to room and forward to socket.io-client

    }

    join = (joinedroom) => {
        const room = room
        const socketid = this.id
        this.rooms.push(joinedroom)
        PubSub.subscribe('room', (msg, data) => {
            const { room, id, userdata, event } = data
            if (room === joinedroom && id !== socketid)
                PubSub.publishSync(`${event}${socketid}`, userdata)
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
        PubSub.publishSync(`${event}${this.id}`, data)
    }
}

module.exports = function () {
    return function () {
        return new SocketServer()
    }
}