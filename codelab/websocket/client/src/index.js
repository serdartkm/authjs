
import React from 'react'
import TextChatContainer from './TextChatContainer'


const style ={
    root:{
        display:"flex",
        justifyContent:"space-between",
 

    }
}


class WebSocketCodeLab extends React.Component{

 

    render(){

        return (<div style={style.root}className="container">

            <TextChatContainer userOne={true}/>
            <TextChatContainer/>
        </div>)
    }

}





ReactDOM.render(
    <WebSocketCodeLab />,
    document.getElementById('root')
  );