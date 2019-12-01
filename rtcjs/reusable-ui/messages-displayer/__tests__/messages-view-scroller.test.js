import{h} from 'preact'
import  render from 'preact-render-to-string';
import MessagesViewScroller from '../lib/messages-view-scroller'



describe('MessagesViewScroller', () => {
    it("renders correctly", () => {
        const tree = render(<MessagesViewScroller />)
        expect(tree).toMatchSnapshot();
    })
})