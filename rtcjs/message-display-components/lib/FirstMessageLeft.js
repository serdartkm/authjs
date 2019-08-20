import React from 'react'
import DateLine from './DateLine'
import Message from './Message'
import Avatar from './Avatar';


const FirstMessageLeft = ({ message, datetime, dateSpace,side,local, from }) => {

    return (
        <div>
            <div>{dateSpace && <DateLine datetime={datetime} />}</div>
            <div style={{ display: "flex" }} >
                <div>
                 
                    <div style ={{display:"flex", alignItems:"center"}}>
                    {local===false &&  <Avatar from ={from}/>}
                    <Message datetime={datetime}  backgroundColor="#E6EE9C">{message}
                   
                    </Message>    
                     
                    </div>
                  
                </div>
            </div>
        </div>)
}

export default FirstMessageLeft

