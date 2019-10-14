

module.exports =function(socket,next){
 //   if(socket.request.headers.cookei) return next()
socket.name ="serdarash"
 console.log("authenticated")
    next()
}