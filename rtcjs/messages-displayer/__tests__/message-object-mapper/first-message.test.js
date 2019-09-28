import React from 'react'
import FirstMessage from '../../lib/message-object-mapper/first-message'
import renderer from 'react-test-renderer'

describe("SNAPSHOT TEST FirstMessage component snapshot",()=>{
    it("Message local renders correctly",()=>{
        const tree =renderer
        .create(<FirstMessage  FirstMessage datetime={1569393960355} message="First Message" letter ="m" local={true}/>).toJSON()
         expect(tree).toMatchSnapshot();
    })

    it("Message remote renders correctly",()=>{
        const tree =renderer
        .create(<FirstMessage  FirstMessage datetime={1569393960355} message="First Message" letter ="m" local={false}/>).toJSON()
     expect(tree).toMatchSnapshot();
    })
})