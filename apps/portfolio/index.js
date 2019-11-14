

import { h, render, Component } from 'preact';
// import ChatRoom from './ChatRoom'
import Nav from './Nav'
    render(
        <div style={{ display: "flex",flexDirection:"column", alignItems: "center",marginTop:70 }}>
            <div style={{display:"flex",justifyContent:"center"}}>
                <h3>SocketIO text messaging demo</h3>
            </div>
            <Nav />
        </div>
        ,
        document.getElementById('root')
    );




