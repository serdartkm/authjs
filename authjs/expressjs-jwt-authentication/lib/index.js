const bcrypt = require('bcrypt');
//import jwt from 'jsonwebtoken';
const MongoClient = require("mongodb").MongoClient;
//import exjwt from 'express-jwt';
const signup =require ('./helper/signup')
const changePassword =require ('./helper/changePassword')
const login = require ('./helper/login')
const profile =require( './helper/profile')
const recover =require ('./helper/recover')
const crud =require( './helper/crud')
module.exports =function ({resetUrl, mongoUrl,colName}) {
    let client = null;
    (async () => {
        try {
            client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
        } catch (error) {
            console.log("mongodb connection error", error)
        }
        
    })()

    return async function (req, res) {
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