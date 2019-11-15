import{h} from 'preact'
import MessagesViewScroller from '../lib/messages-view-scroller'
import  render from 'preact-render-to-string';



describe('MessagesViewScroller', () => {
    it("renders correctly", () => {
        const tree = render(<MessagesViewScroller></MessagesViewScroller>)
        expect(tree).toMatchSnapshot();
    })
})