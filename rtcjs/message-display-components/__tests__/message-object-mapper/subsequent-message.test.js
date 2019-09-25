import React from 'react'
import  SubsequentMessage  from '../../lib/message-object-mapper/subsequent-message'
import renderer from 'react-test-renderer'
describe("SubsequentMessageView snapshot", () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<SubsequentMessage message="hello from subsequent message" datetime={1569393960355} />).toJSON()

        expect(tree).toMatchSnapshot();
    })
})



