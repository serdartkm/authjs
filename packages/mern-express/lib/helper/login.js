import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');

const invalidCredentials = {
  password: { isValid: false, message: "Email or password does not match." },
  email: { isValid: false, message: "Email or password does not match." }
}
const login = async function (req, res, collection) {
  const { email, password } = req.query
    console.log("params---",req.query)
 
  try {
    const user = await collection.findOne({ email })
    console.log("user-------", user)
    if (user === null) {
      res.status(200).send({ validation:invalidCredentials })
    } else {
      const resBcrypt = await bcrypt.compare(password, user.password)

      if (resBcrypt) {
        const payload = { id: user._id.toString(), name: user.email }
        const token = await jwt.sign(payload, process.env.secret, { expiresIn: 31556926 })
        res.status(200).send({token})
      } else {
        res.status(200).send({ validation:invalidCredentials })
      }
    }

  } catch (error) {
    res.status(400).send({ serverError: error })
  }
}

export default login