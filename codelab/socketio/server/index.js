require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const http = require("http");
const cors = require("cors");
const app = express()
const server = http.createServer(app);
require('../../../rtcjs/socketio-server')(server)

const users = {}


app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, `../client/build`)))


app.post("/login", (req, res) => {

  res.writeHead(200, {
    'Set-Cookie': `username=${req.body.username}`,
    'Content-Type': 'text/plain'
  })
  res.end('hello\n')
})







function parseCookies(r) {
  var list = {},
    rc = r.headers.cookie;
  rc && rc.split(';').forEach(function (cookie) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));

  })

  return list
}













server.listen(PORT, () => console.log(`Listening on ${PORT}`));

