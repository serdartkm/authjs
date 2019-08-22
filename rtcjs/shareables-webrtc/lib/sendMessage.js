const sendMessage = ({self,message}) => {
  
    self.dataChannel.send(JSON.stringify({message})) 
    
  }

  export default sendMessage