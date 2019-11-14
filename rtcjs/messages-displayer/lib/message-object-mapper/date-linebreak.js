

import {h} from 'preact'
const DateLinebreak =({datetime})=>{
    return (<div style={{display:"flex"}}><div style={{flex:"1"}}><hr/></div><div>{new Date(datetime).toLocaleDateString()}</div><div style={{flex:1}}><hr/></div></div>)
}

export default DateLinebreak