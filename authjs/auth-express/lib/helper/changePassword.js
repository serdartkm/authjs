const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID
const changePassword = async (req, res, collection) => {
    //const SALT_WORK_FACTOR = 10;
    try {
        const { password, token } = req.body;
        const decoded = await jwt.verify(token, process.env.secret)
        let { id } = decoded;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const result = await collection.findOneAndUpdate({ _id: new ObjectID(id) }, { $set: { password: hash } })
        const user = result.value
        const payload = { id, name: user.email }
        const newToken = await jwt.sign(payload, process.env.secret, { expiresIn: "300d" })
        res.status(200).send({token: newToken})
    } catch (error) {
        res.status(400).send({serverError: error})
    }

}
///Change password modified
module.exports= changePassword