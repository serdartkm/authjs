module.exports.createServer =function(){
  
return {
    close:()=>{
        debugger
console.log("I am closing")
    },
    listen : (port)=>{
        console.log("I am opening")
        this.listening =false
        debugger
        setInterval(()=>{
            PubSub.publishSync(`listening`, `listening on port ${port}`)
            this.listening=true
            console.log("1.SERVER STARTED LISTENING")
        },0)
 
    }
}
}
  
