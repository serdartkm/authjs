import PubSub from 'pubsub-js'
let interval = null

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
        this.socket = new Socket("socket", this)
        this.rooms = []
    }
    connect = () => {
        PubSub.publishSync("connection", this.socket)
        return this
    }

    on = (event, cb) => {

        PubSub.subscribe(`socket${event}`, (msg, data) => {
            cb(data)
        })
    }

    emit = (event, data) => {

        PubSub.publishSync(`${event}`, data)
    }
}
//
class Socket {
    constructor(name, client) {
        this.name = name,
            this.rooms = ['one', 'two'],
            this.client = client,
            this.events = []

    }

    to = (room) => {

        this.rooms.push(room)
        return {
            emit: (event, data) => {        
                this.rooms.forEach(r => {
                    PubSub.publishSync(`${r}${event}`, data)
                });
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
        const events = this.event
        this.client.rooms.push(new Room(room, events))
    }
}

class Room {
    constructor(name, events = []) {
        this.name = name,
            this.events = events,

            this._subscribe()
    }

    _subscribe = () => {
        this.events.forEach(event => {
            PubSub.subscribe(`${name}${event}`, (msg, data) => {
                PubSub.publishSync(`socket${event}`, data)
            })
        })
    }
}
export {
    SocketClient,
    SocketServer
}