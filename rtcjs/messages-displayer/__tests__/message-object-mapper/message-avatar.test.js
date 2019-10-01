import React from 'react'
import MessageAvatar from '../../lib/message-object-mapper/message-avatar'
import renderer from 'react-test-renderer'


describe("SNAPSHOT TEST MessageAvatar",()=>{

    it("MessageAvatar renders correctly",()=>{
        const tree = renderer.create(<MessageAvatar letter="A"/>).toJSON()

        expect(tree).toMatchSnapshot();

    })
})