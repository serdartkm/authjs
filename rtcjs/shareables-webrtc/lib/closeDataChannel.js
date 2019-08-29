const  closeDataChannel = ({self}) => {

     self.DataChannel.send("close")

  };
  export default closeDataChannel