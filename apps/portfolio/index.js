import React from 'react'

import MessageModuleSocket from '../../rtcjs/messaging-module-socket'
import AnonymousToken from './AnonymousToken'
class AppTwo extends React.Component {
    
    state = { tokenMario: null, tokenDragos: null }
  
    render() {
        return (<AnonymousToken username="mario">{(({socket})=>{
            console.log("socket",socket)
            if(socket !==undefined)
            return (
            <MessageModuleSocket id={1} name="mario" targetName="dragos" socket={socket} />
            )

            return <div>Loading</div>
        })}</AnonymousToken>)
    }
}

ReactDOM.render(
    <AppTwo />,
    document.getElementById('root')
);



{/* <MessagingModuleSocket id={1} name="dragos" targetName="mario" socket={this.clientTwo} /> */}