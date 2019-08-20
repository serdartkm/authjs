import React from 'react'
import DateLine from './DateLine'
import Avatar from './Avatar';
import Message from './Message'
const FistMessageRight = ({ message, datetime, dateSpace, side, local, from }) => {
    return (
        <div>
            <div>{dateSpace && <DateLine datetime={datetime} />}</div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}> {local === false && <Avatar from ={from}/>}</div>
                    <div style ={{display:"flex", alignItems:"center"}}>
                    <Message datetime={datetime} backgroundColor="#FFECB3">{message}</Message>    
                    </div>
                    
                </div>

                <div style ={{display:"flex", alignItems:"center"}}>
            
                    
            </div>

            </div>
        </div>)
}
export default FistMessageRight
