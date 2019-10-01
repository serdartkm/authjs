import React from 'react'
import MessageAligner from '../../lib/message-object-mapper/message-aligner'
import renderer from 'react-test-renderer'

describe("message-aligner component ", () => {

    it("renders correctly to the left", () => {
        const tree = renderer
            .create(<MessageAligner align="left">
                <div>Child component on the left side</div>
            </MessageAligner>).toJSON()

        expect(tree).toMatchSnapshot();
    })
    it("renders correctly to the right", () => {
        const tree = renderer
            .create(<MessageAligner align="right">
                <div>Child component on the left side</div>
            </MessageAligner>).toJSON()

        expect(tree).toMatchSnapshot();
    })
})



