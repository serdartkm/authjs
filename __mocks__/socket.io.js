'use strict';
import PubSub from 'pubsub-js'
class SocketServer {
    constructor() {
        this.stack = []
        PubSub.subscribe(`connection`, (msg, data) => {
          //  console.log("connection from client recived")
            if (this.stack.length > 0) {
                this.stack.forEach(async (s) => {
                  //  console.log("midleware registered")
                    await s(data, () => { })


                })
            }
        })
    }
    on = (event, cb) => {
        PubSub.subscribe(event, (msg, data) => {
            if (event === "connection") {
                //console.log("connection  from recieved")
                if (this.stack.length > 0) {
                    this.stack.forEach(async (s) => {
                        console.log("midleware inv")
                        await s(data, () => { })
                        cb(data)

                    })
                } else {
                    cb(data)
                }

            }
            else {
                cb(data)
            }

        })
    }

    use = (callback) => {
       // console.log("middleware recieved")
        this.stack.push(callback)
    }


}



module.exports = function (server) {

    return new SocketServer(server)
}