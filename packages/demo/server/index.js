import MernAuthMiddleware from '@authjs/express'
import express from'express'
import path from 'path'
import bodyParser from 'body-parser'
import expressMongo from '@mongodbjs/express'
const MongoClient = require("mongodb").MongoClient;

require('dotenv').config()
//
//console.log("PROCESS ENV",process.env.secret)
const app =express()
app.use(bodyParser.json())
let client =null;
let db =null;
(async()=>{
    try {
        client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
        db = await client.db("demo");
        const collection = db.collection("users");
        app.use(expressMongo({mongoUrl:"mongodb://localhost:27017"}))
        app.use(express.static(path.join(__dirname, '../public')))
        app.use(MernAuthMiddleware({collection,resetUrl:"http://localhost:3000/#/resetpass"}));
    } catch (error) {
        console.log("mongodb connection error",error)
    }
})()


/*
process.once('SIGUSR2',()=>{
    process.kill(process.pid,'SIGUSR2')
})
*/
process.on('SIGUSR2', () => { process.exit(0); });
process.on('SIGINT',()=>{
    process.exit(0)
})

process.on('SIGTERM',()=>{
    process.exit(0)
})

app.listen('3000',()=>{
    console.log('listening on port 3000')
})