const MongoClient = require("mongodb").MongoClient;
const io = require("socket.io");
let users = {};
module.exports=  async (httpServer, mongoDbUrl)=> {
  let client = null;
  const dbName = "rtcjs";
  let db = null;
  const socketServer = io(httpServer);
  try {
    client = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
    db = await client.db(dbName);
    console.log("Connected successfully to mdb server");
    socketServer.on("connect", async socket => {
      socket.join(socket.handshake.query["name"]);
      socket.userName =socket.handshake.query["name"]
      users[socket.handshake.query["name"]] = {
        id: socket.id
      };
      let name = socket.handshake.query["name"];
      require("./onlineStateChange")({ socket, db, name });
      require("./messagesPostponed")({ socket, db, name });
      require("@rtcjs/server-webrtc-signaling")({ socket, users, db });
      require("@rtcjs/server-contacts")({ socket, users, db });
      require("@rtcjs/server-peer-text-chat")({ socket, users, db });
    })

    socketServer.on("disconnect", function() {
      if (connection.handshake.query["name"]) {
        delete users[connection.handshake.query["name"]];
      }
    });
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};
