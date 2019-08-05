const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
//import exjwt from 'express-jwt';
const login = async function(req, res, collection)  {
    const { username, password } = req.body;
    try {
        const user =await collection.findOne({username})
        const resBcrypt = await bcrypt.compare(password,user.password)
        if(resBcrypt){
        const payload= {id:user._id.toString(),name:user.username}
        const token = await jwt.sign(payload,process.env.secret,{  expiresIn: 31556926})
          res.status(200).send({success:true,token})
        }
    } catch (error) {  
      
      res.status(400).send({success:false,error})
    }
}
const signup = async(req, res, collection) => {
    //const SALT_WORK_FACTOR = 10;
    const { username, password } = req.body;
    try {
        const user = await collection.findOne({ username })
        if (user !== null) {
            res.send({ err: "user name is taken" })
        }
        else {
            try {
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                const result = await collection.insertOne({ password: hash, username })
                const user =result.ops[0]
                const resBcrypt = await bcrypt.compare(password,user.password)
                if(resBcrypt){
                const payload= {id:user._id.toString(),name:user.username}
                const token = await jwt.sign(payload,process.env.secret,{  expiresIn: 31556926})
                res.status(200).send({success:true,token})
                }
            } catch (error) {
                console.log("error signup", error)
            }
        }
    } catch (error) {

    }
}

export default (collection) => {
    return async (req, res, next) => {
        if (req.path === "/log-in") {

           
            login(req, res, collection)
           
        }
        if (req.path === "/signup") {
            signup(req, res, collection)
           
        }
       
    }
}