import React from 'react'
import MessageDateLine from '../../lib/message-object-mapper/date-linebreak'
import renderer from 'react-test-renderer'




describe("MessageDateLine component snapshot",()=>{
    it("renders correctly",()=>{
        const tree =renderer
        .create(<MessageDateLine datetime={1569393960355}/>).toJSON()
         expect(tree).toMatchSnapshot();
    })
})
