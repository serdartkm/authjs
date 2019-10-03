const io = require("socket.io");
const WebSocket = require('ws')
module.exports=  async (httpServer)=> {

const socketOIServer =io(httpServer)

const webSocketServer =new WebSocket.Server({server:httpServer})



}