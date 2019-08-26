

  const sendString=({self,message})=>{
  console.log("3.Forwarding initial file...",message)
    self.dataChannel.send(JSON.stringify({message}))

  }

  const sendArrayBuffer =({self,message})=>{  

    self.dataChannel.binaryType = 'arraybuffer'
  //  if(self.dataChannel)
  if(self.dataChannel.readyState==="open"){
  //11  console.log("sending arraybufer",message)

    try {
      self.dataChannel.send(message) 
    } catch (error) {
      console.log("error----",error)
    }
  }
  
  }

  export {
    sendString,
    sendArrayBuffer
  }