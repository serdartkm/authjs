

import { h, render, Component } from 'preact';
import('./ChatRoom').then(({default: ChatRoom})=>{
    render(
        <div style={{ display: "flex",flexDirection:"column", alignItems: "center",marginTop:70 }}>
            <div style={{display:"flex",justifyContent:"center"}}>
                <h3>SocketIO text messaging democ</h3>
            </div>
            <ChatRoom />
        </div>
        ,
        document.getElementById('root')
    );

})


