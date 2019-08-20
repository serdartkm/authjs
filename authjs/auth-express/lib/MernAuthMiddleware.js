const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
const MongoClient = require("mongodb").MongoClient;
//import exjwt from 'express-jwt';
import signup from './helper/signup'
import changePassword from './helper/changePassword'
import login from './helper/login'
import profile from './helper/profile'
import recover from './helper/recover'
import crud from './helper/crud'
export default ({resetUrl, mongoUrl,colName}) => {
    let client = null;
    (async () => {
        try {
            client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
        } catch (error) {
            console.log("mongodb connection error", error)
        }
    })()
    return async (req, res) => {
      const  collectionName = colName !==undefined ?colName: "users"
        const database = await client.db("demo");
        const collection = database.collection(collectionName)
        if (req.path === "/log-in") {
            login({req, res, collection})
        }
        if (req.path === "/signup") {
            signup({req, res, collection})
        }
        if(req.path==="/change"){
            changePassword({req,res,collection})
        }
        if(req.path==="/profile"){
            profile({req,res,collection})
        }
        if(req.path==="/recover"){
            console.log("recover function invoked")
            recover({req,res,collection,resetUrl})
        }
        if(req.path==="/users"){
            console.log("/users called")
            crud({req,res,collection})
        }
       
    }
}