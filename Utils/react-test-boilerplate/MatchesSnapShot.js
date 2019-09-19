
import React from 'react'
import render from 'react-test-renderer';

const MatchesSnapShot =(Component,props,withRenderProp)=>{

    describe(`MatchesSnapShot ${Component.name}`,()=>{
        it("snapshot matches",()=>{
            let tree =render.create(<Component {...props}>{()=><div>Hellow.</div>}</Component>)
        
             expect(tree).toMatchSnapshot();
        })
   
    })



}

export default MatchesSnapShot