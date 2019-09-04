import authjsExpress from '@authjs/express'
import express from'express'
import path from 'path'
import bodyParser from 'body-parser'
import expressMongo from '@mongodbjs/express'
import rtcjsServer  from "@rtcjs/server";
const PORT = process.env.PORT || 3000;
const http = require("http");
const cors = require("cors");
const app =express()
const server = http.createServer(app);
const mongoUrl ="mongodb://localhost:27017"
rtcjsServer(server, mongoUrl),
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(expressMongo({mongoUrl}))
app.use(authjsExpress({mongoUrl,resetUrl:"http://localhost:3000/#/resetpass"}));

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
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




