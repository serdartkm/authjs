var nodemailer = require('nodemailer')


module.exports =function(){

    var transport = nodemailer.createTransport('SMTP', { // [1]
      service: "Gmail",
      auth: {
        user: "tkm.house.new@gmail.com",
        pass: process.env.password
      }
    })
    
    if (process.env.NODE_ENV === 'production') {
         // [2]
      process.on('uncaughtException', function (er) {
        console.error(er.stack) // [3]
        transport.sendMail({
          from: 'tkm.house.new@gmail.com',
          to: 'tkm.house.new@gmail.com',
          subject: er.message,
          text: er.stack // [4]
        }, function (er) {
           if (er) console.error(er)
           process.exit(1) // [5]
        })
      })
    }
    else if (process.env.NODE_ENV === 'production'){
        if (er) console.error(er)
        process.exit(1) // [5]
    }
}