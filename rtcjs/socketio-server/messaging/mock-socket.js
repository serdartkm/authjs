import PubSub from 'pubsub-js'
var uniqid = require('uniqid');

class SocketServer {
    constructor() {

    }
    on = (event, cb) => {
        PubSub.subscribe(event, (msg, data) => {
            cb(data)
        })
    }
}

class SocketClient {
    constructor(name) {
        this.id = uniqid()
        this.socket = new Socket("socket", this)
        this.events = []
        this.rooms=[]
    }
    connect = () => {
        PubSub.publishSync("connection", this.socket)
        return this
    }

    on = (event, cb) => {

        PubSub.subscribe(`socket${event}`, (msg, data) => {
            cb(data)
        
        })

        if(this.rooms.length>0){
            this.rooms.forEach(r=>{
                PubSub.subscribe(`${r}${event}`, (msg, data) => {
                    cb(data)
                })
            })
        }
    }

    emit = (event, data) => {

        PubSub.publishSync(`${event}`, data)
    }
//
    join = (room) => {
   
        this.rooms.push(room)

    }
}
//
class Socket {
    constructor(name, client) {
        this.name = name,
            this.client = client
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