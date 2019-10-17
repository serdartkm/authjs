module.exports.createServer =function(){
return {

    listen : (port)=>{

        setInterval(()=>{
            PubSub.publishSync(`listening`, `listening on port ${port}`)
            console.log("1.SERVER STARTED LISTENING")
        },0)
 
    }
}
}
  
