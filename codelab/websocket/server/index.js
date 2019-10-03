require('dotenv').config()
const express =require('express')
const path =require ('path')
const bodyParser =require ('body-parser')
const PORT = process.env.PORT || 3000;
const http = require("http");
const cors = require("cors");
const app =express()
const server = http.createServer(app);
const WebSocket =require('ws')
const wss = new WebSocket.Server({server})


wss.on('connection',(socket)=>{
  
  console.log("connection from cleint to:",wss.clients[socket])

  socket.send("text_message")

})

app.use(cors());
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, `../client/build`)))


server.listen(PORT, () => console.log(`Listening on ${PORT}`));

/*
process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

*/