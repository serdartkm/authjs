const nodemailer = require('nodemailer')

module.exports = {
    sendEmail: ({
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
    }, cb) => {
        
        try {
            debugger
            eventBus.on('response.mailing.success', (response) => {
                debugger
                cb({ error: null, response })
            })
            eventBus.on('response.mailing.error', (error) => {
                debugger
                cb({ error, response: null })
            })
            debugger
            eventBus.emit('request.mailing', {user,pass,host,port,secure,from,to,subject,text,html})
        } catch (error) {
            debugger
            cb({ error, response: null })
        }

    }
}