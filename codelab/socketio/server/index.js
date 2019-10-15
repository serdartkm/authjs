
const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:path.join(__dirname, `./.env`)})
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


app.post("/login", async(req, res) => {

const {username}= req.body

  try {
    const token = await jwt.sign({data:username}, process.env.secret, { expiresIn: '1h' })
    res.json({token})
  } catch (error) {
   
    res.send({error})
  }
 

})


process.once('SIGUSR2', function () {
  server.close(function () {
    process.kill(process.pid, 'SIGUSR2')
  })
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

