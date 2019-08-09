const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
//import exjwt from 'express-jwt';
import signup from './helper/signup'
import changePassword from './helper/changePassword'
import login from './helper/login'
import profile from './helper/profile'
import recover from './helper/recover'
import users from './helper/users'
export default ({collection,resetUrl}) => {
    return async (req, res, next) => {
        if (req.path === "/log-in") {
            login(req, res, collection)
        }
        if (req.path === "/signup") {
            signup(req, res, collection)
        }

        if(req.path==="/change"){
            changePassword(req,res,collection)
        }
        if(req.path==="/profile"){
            profile(req,res,collection)
        }
        if(req.path==="/recover"){
            console.log("recover function invoked")
            recover({req,res,collection,resetUrl})
        }
        if(req.path==="/users"){
            console.log("/users called")
           users({req,res,collection})
        }
       
    }
}