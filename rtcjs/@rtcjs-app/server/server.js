const express = require("express");
const http = require("http");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const rtcjsServer = require("@rtcjs/server");
rtcjsServer(server, "mongodb://localhost:27017"),
app.use(cors());
app.use("/", express.static("./public"));
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
