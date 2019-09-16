'use strict';
import React from 'react'
import { shallow } from 'enzyme';
import {ChildComponent}  from './ChildComponent'
const withRenderProp =(Component=null,props={},withRenderProp=true, render=shallow)=>{

    let wrapper=null
    if(withRenderProp){
     wrapper = render(<Component {...props}>{(renderProps) =>{
     return<ChildComponent {...renderProps}/>} }</Component>)
    }
    else{
     wrapper = render(<Component {...props}/>)
    }
 return wrapper
}

export default withRenderProp



