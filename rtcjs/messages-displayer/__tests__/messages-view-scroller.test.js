import React from 'react'
import MessagesViewScroller from '../lib/messages-view-scroller'
import renderer from 'react-test-renderer'



describe('MessagesViewScroller', () => {
    it("renders correctly", () => {
        const tree = renderer.create(<MessagesViewScroller></MessagesViewScroller>)
        expect(tree).toMatchSnapshot();
    })
})