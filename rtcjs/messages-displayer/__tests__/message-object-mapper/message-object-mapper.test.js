import React from 'react'
import renderer from 'react-test-renderer'
import MessageObjectMapper from '../../lib/message-object-mapper/message-object-mapper'

describe("SNAPSHOT TEST MessageObjectMapper", () => {

    it("MessageObjectMapper renders correctly", () => {

        const tree = renderer
            .create(<MessageObjectMapper datetime={1569393960355} side="right" message="hello" letter="F" order="F" local={true} dateSpace={true} />).toJSON()

        expect(tree).toMatchSnapshot();
    })

})
