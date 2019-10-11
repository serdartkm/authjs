import PubSub from 'pubsub-js'


let interval = null
class SocketServer {
    constructor() {
        console.log("server init..")
    }

    on = (event, cb) => {
        PubSub.subscribe(event, (msg, data) => {
            cb(data)
        })
    }
}

class SocketClient {
    constructor() {
        console.log("client init..")

    }
    connect = () => {
        PubSub.publishSync("connection", this)

        return this
    }
    to = () => {
        return this
    }
    on = (event, cb) => {
        console.log("event", event)
        PubSub.subscribe(event, (msg, data) => {
            cb(data)
        })
    }

    emit = (event, data) => {
        console.log("emit function is clicked")
        PubSub.publishSync(event, data)
    }
}

export {
    SocketClient,
    SocketServer
}