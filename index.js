global.reqlib = require('app-root-path').require;
require('./globals/globals')()
require('dotenv').config()
//const uncaughtExceptionHandler =require('./utils/error-handlers/uncaught-exception-handler')()
const express =require('express')
const morgan =require('morgan')
const path =require ('path')
const bodyParser =require ('body-parser')
const PORT = process.env.PORT || 3000;
const http = require("http");
const cors = require("cors");
const app =express()
const server = http.createServer(app);
const anonymous =require('./authjs/expressjs-jwt-authentication/anonymous/anonymous')
const errorhandler =require('./Utils/error-handlers/express-error-handler')
const nodeJsSocketIoTextChat = require('./rtcjs/nodejs-socketio-text-chat')


debugger
app.use(cors());


//nodeJsSocketIoTextChat(server)
if(process.env.NODE_ENV==="development"){
  console.log("process NODE_ENV.....",process.env.NODE_ENV)
  app.use(express.static(path.join(__dirname, `apps/${process.env.appName}/build`)))
}
app.use(bodyParser.json())



app.post('/anonymous',anonymous)
debugger
app.use(errorhandler)

server.listen(PORT, () => console.log(`Listening on ${PORT}, processid${process.pid}`));




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





















//app.use(express.static(path.join(__dirname, `apps/${process.env.appName}/build`)))

//app.use(expressMongo({mongoUrl}))
//app.use(authjsExpress({mongoUrl,resetUrl:`${mongoUrl}#/resetpass`}));

///
//var mongoUrl = process.env.MONGODB_URL
//console.log("mongoUrl>>>>>>>>>>>>>>>>>>>>>>>>>",mongoUrl)
//rtcjsServer(server, mongoUrl),

//const expressMongo =require('@mongodbjs/express')
//const rtcjsServer =require("@rtcjs/server");

//const authjsExpress =require('@authjs/express')