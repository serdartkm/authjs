import React from 'react'

const style={height:30,
    width:50,
    height:50,
    padding:3,
    borderRadius:25,
     backgroundColor:"darkSmoke",
     borderStyle:"solid",
     borderWidth:2,
     textAlign:"center",
     color:"#009688",
     borderColor:"#80cbc4"}
    



const Avatar =({from})=>{
    return (<div style={style}>{from[0]}</div>)
}

export default Avatar