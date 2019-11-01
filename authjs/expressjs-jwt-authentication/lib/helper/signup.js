const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signup = async({req, res, collection}) => {
    //const SALT_WORK_FACTOR = 10;
    const { email, password } = req.body;
    try {
        const user = await collection.findOne({ email })
        if (user !== null) {
            res.status(200).send({validation:{email:{isValid:false,message:"This username is already registered."}}})
        }
        else {
            try {
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                const result = await collection.insertOne({ password: hash, email })
                const user =result.ops[0]
                const resBcrypt = await bcrypt.compare(password,user.password)
                if(resBcrypt){
                const payload= {id:user._id.toString(),name:user.email}
                const token = await jwt.sign(payload,process.env.secret,{  expiresIn: 31556926})
                res.status(200).send({token})
                }
            } catch (error) {
                res.status(400).send({serverError:error})
            }
        }
    } catch (error) {
        res.status(400).send({serverError:error})
    }
}

module.exports =signup