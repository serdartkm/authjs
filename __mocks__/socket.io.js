'use strict';
const PubSub = require('pubsub-js')

class SocketServer {
    constructor() {
        this.rooms=[]
        this.stack = []
      
    }

    use = (callback) => {
        this.stack.push(callback)
    }

    on = (event, cb) => {
        debugger
        if(event ==="connection"){
            debugger
           setInterval(()=>{
                debugger
                PubSub.publishSync(`listening`, "")
                console.log("listening.....")
            },0)
          
            PubSub.subscribe(`connect`,  (msg, data) => {
                debugger
                // const { id, handshake } = data
        
                // const socket = new Socket(id, handshake)
                // if (this.stack.length > 0) {
                //     for (const fn of this.stack) {
                //         await fn(socket, () => { })
                //     }
                //     PubSub.publishSync(`connection${id}`, socket)
                // }
                // else {
                //     debugger
                //     PubSub.publishSync(`connection${id}`, socket)
                // }
            })
        }
        debugger
        // if (event === "connection") {
        //     PubSub.subscribe(event, (msg, data) => {
        //         debugger
        //         cb(data)
        //     })
        // }
    }
}

class Socket {
    constructor(id, handshake) {
        this.id = id
        this.handshake = handshake
        this.rooms = []
    }

    on = (event, cb) => {
        debugger

        //subscribtion for messages recived from client
        PubSub.subscribe(`${id}${event}`, (msg, data) => {
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

    return function () {
        return new SocketServer()
    }
}