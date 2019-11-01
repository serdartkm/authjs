const jwt =require('jsonwebtoken');
const nodemailer = require("nodemailer")
const recover = async ({ req, res, collection, resetUrl }) => {
    const { email } = req.body

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.googlemail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.email, // generated ethereal user
                pass: process.env.password // generated ethereal password
            }
        })
        const user = await collection.findOne({ email })
        if (user) {
            const payload = { id: user._id.toString() }
            const token = await jwt.sign(payload, process.env.secret, { expiresIn: "10h" })
            const link = `${resetUrl}/${token}`
            let info = await transporter.sendMail({
                from: process.env.email, // sender address
                to: email, // list of receivers
                subject: "Password Reset", // Subject line
                text: "Click the link below to reset password", // plain text body
                html: `<p>Click <a href="${link}">here</a> to reset your password</p>` // html body
            });

            res.status(200).send({ validation: { email: { isValid: true, message: "Mail delivered to your mailbox" } } })
        }
        else {
            res.status(200).send({ validation: { email: { isValid: false, message: "User not registered." } } })
        }

    } catch (error) {
        res.status(400).send({ serverError: error })
    }

}

module.exports =recover