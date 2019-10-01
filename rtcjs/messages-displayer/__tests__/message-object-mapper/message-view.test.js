import React from 'react'
import renderer from 'react-test-renderer'
import MessageView from '../../lib/message-object-mapper/message-view'

describe("MessageView snapshot test",()=>{

    it('renders correctly', () => {
        const tree = renderer
            .create(<MessageView message="hello from subsequent message" datetime={1569393960355} />).toJSON()

        expect(tree).toMatchSnapshot();
    })
})