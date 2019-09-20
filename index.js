require('dotenv').config()
const authjsExpress =require('@authjs/express')
const express =require('express')
const path =require ('path')
const bodyParser =require ('body-parser')
const expressMongo =require('@mongodbjs/express')
const rtcjsServer =require("@rtcjs/server");
const PORT = process.env.PORT || 3000;
const http = require("http");
const cors = require("cors");
const app =express()
const server = http.createServer(app);
///
var mongoUrl = process.env.MONGODB_URL
console.log("mongoUrl>>>>>>>>>>>>>>>>>>>>>>>>>",mongoUrl)
rtcjsServer(server, mongoUrl),
app.use(cors());
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, `apps/${process.env.appName}/build`)))
app.use(expressMongo({mongoUrl}))
app.use(authjsExpress({mongoUrl,resetUrl:`${mongoUrl}#/resetpass`}));

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
