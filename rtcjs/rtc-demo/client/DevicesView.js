import React from 'react'
import './minimal-devices/css/iphone.css'
import './minimal-devices/css/imac.css'
import './minimal-devices/css/ipad.css'
import './minimal-devices/css/macbook.css'
import classNames from 'classnames'

class DeviceContainer extends React.Component {


    state = { selected: ""}

    switchDevice = (selected) => {

        this.setState({ selected })
    }

  
    render() {
        const { children } = this.props
        const { selected, height,scale } = this.state
   
        return (<div>
            <DeviceSwitcher switchDevice={this.switchDevice} />
            <div>
                {children({ selected, height,scale })}
            </div>

        </div>)
    }

}
export default DeviceContainer
const DeviceSwitcher = ({ switchDevice, selected }) => {

    const btnStyle={
    margin:2
    }

    return (<div style={{zoom:"50%"}}>

        <button style={btnStyle} type="button" className={classNames('btn', { 'btn-outline-dark': selected !=="imac", 'btn-dark': selected==="imac" })} onClick={() => switchDevice('imac')}>imac</button>
        <button  style={btnStyle} type="button" className={classNames('btn', { 'btn-outline-dark': selected !=="ipad", 'btn-dark': selected==="ipad" })} onClick={() => switchDevice('ipad')}>ipad</button>
        <button  style={btnStyle} type="button" className={classNames('btn', { 'btn-outline-dark': selected !=="iphone", 'btn-dark': selected ==="iphone" })} onClick={() => switchDevice('iphone')}>iphone</button>
        <button  style={btnStyle} type="button" className={classNames('btn', { 'btn-outline-dark': selected !=="macbook", 'btn-dark': selected==="macbook" })} onClick={() => switchDevice('macbook')}>macbook</button>
    </div>)
}



const DevicesView = ({ deviceType , children,user }) => {
    
    switch (deviceType) {
        case "imac":
            return (<div style={{padding:3}}><div style={{textAlign:"center"}}>{user}</div><IMacView>{children}</IMacView></div>)
        case "ipad":
            return (<div style={{padding:3}}><div style={{textAlign:"center"}}>{user}</div><IPadView>{children}</IPadView></div>)

        case "iphone":
            return (<div style={{padding:3}}><div style={{textAlign:"center"}}>{user}</div><IPhoneView>{children}</IPhoneView></div>)
        case "macbook":
            return (<div style={{padding:3}}><div style={{textAlign:"center"}}>{user}</div><MacBookView >{children}</MacBookView></div>)
        default:
            return <div style={{padding:3}}><div style={{textAlign:"center"}}>{user}</div><IPhoneView>{children}</IPhoneView></div>
    }
}
export {
    DevicesView
}

const IMacView = ({ children }) => {
    return (<div className="md-imac">
        <div className="md-body">
            <div className="md-top">
                <div className="md-camera"></div>
                <div className="md-screen">
                    {children}
                </div>
            </div>
        </div>

        <div className="md-base">
            <div className="md-stand"></div>
            <div className="md-foot"></div>
        </div>
    </div>)
}

const IPadView = ({ children }) => {

    return (
        <div className="md-ipad  md-white-device">
        <div className="md-body">
            <div className="md-front-camera"></div>
    
            <div className="md-screen">
           {children}
            </div>
    
            <button className="md-home-button"></button>
        </div>
    </div>)
}

const IPhoneView = ({ children }) => {
    return (<div className="md-iphone-5 md-white-device">
        <div className="md-body">
            <div className="md-buttons"></div>

            <div className="md-front-camera"></div>
            <div className="md-top-speaker"></div>
            <div className="md-screen">
                {children}
            </div>
            <button className="md-home-button"></button>
        </div>
    </div>)
}

const MacBookView = ({ children }) => {
    return (<div className="md-macbook-pro">
        <div className="md-lid">
            <div className="md-camera"></div>

            <div className="md-screen">
                {children}
            </div>

        </div>
        <div className="md-base"></div>
    </div>
    )

}