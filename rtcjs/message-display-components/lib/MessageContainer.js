import React from 'react'
const style = {
    
      backgroundColor: "#edeff2",
      overflow: "auto",
      width:"100%",
      flex:10
  };

const MessageContainer =({children})=>{

    return (<div name="messageContainer" style={style}>{children}</div>)
}

export default MessageContainer