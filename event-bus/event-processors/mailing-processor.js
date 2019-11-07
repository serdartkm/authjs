const nodemailer = require('nodemailer')
module.exports =function mailingProcessor(eventBus){
eventBus
.on('request.mailing', async ({
    user = process.env.email,
    pass = process.env.password,
    host = "smtp.googlemail.com",
    port = 465,
    secure = true,
    from = process.env.email,
    to = process.env.email,
    subject,
    text,
    html
}) => {
    try {
        let transporter = nodemailer.createTransport({
            host,
            port,
            secure, // true for 465, false for other ports
            auth: {
                user// generated ethereal user
                pass// generated ethereal password
            }
        })
        let info = await transporter.sendMail({
            from, // sender address
            to, // list of receivers
            subject, // Subject line
            text, //"Click the link below to reset password", // plain text body
            html, //`<p>Click <a href="${link}">here</a> to reset your password</p>` // html body
        });
        eventBus.emit('response.mailing.success',info)
    } catch (error) {
        eventBus.emit('response.mailing.error', error)
    }
})
}