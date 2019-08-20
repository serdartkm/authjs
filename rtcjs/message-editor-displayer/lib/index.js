'use strict';
import React from 'react'


const MessageEditorDisplayer =({onTextChange, message,sendMesage,disabled=false})=>{
    return(<div  style={{marginTop:2}}>
   <div style={{display:"flex"}}>
    <input onKeyDown={(e)=>{  e.keyCode===13 ? sendMesage() : null}} className='form-control' onChange={onTextChange} value={message} name="message" type="text" placeholder="Enter message text" />
    <button disabled={disabled} style={{marginLeft:2}} className="btn btn-secondary" onClick={sendMesage}>Send</button>
    </div>
</div>)
}

export default MessageEditorDisplayer