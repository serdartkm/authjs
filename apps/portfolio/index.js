import React from 'react'
import ChatRoom from './ChatRoom'

ReactDOM.render(
    <div style={{ display: "flex",flexDirection:"column", alignItems: "center",marginTop:70 }}>
        <div style={{display:"flex",justifyContent:"center"}}>
            <h3>SocketIO text messaging demo</h3>
        </div>
        <ChatRoom />
    </div>
    ,
    document.getElementById('root')
);

