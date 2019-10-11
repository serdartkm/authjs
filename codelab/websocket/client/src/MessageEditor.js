import React from 'react'


const MessageEditor =({onChange,sendMessage,message, connected})=>{
return (<div>
    <div className="input-group">
  <input onChange={onChange} value={message} type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4"/>
  <div className="input-group-append" id="button-addon4">
    <button disabled= {!connected || message===""} onClick={sendMessage} className="btn btn-outline-secondary" type="button">Send</button>
   
  </div>
</div>
</div>)
}


export default MessageEditor