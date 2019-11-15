import{h} from 'preact'
import MessageAligner from '../../lib/message-object-mapper/message-aligner'
import  render from 'preact-render-to-string';
describe("message-aligner component ", () => {

    it("renders correctly to the left", () => {
        const tree = render
           (<MessageAligner align="left">
                <div>Child component on the left side</div>
            </MessageAligner>)

        expect(tree).toMatchSnapshot();
    })
    it("renders correctly to the right", () => {
        const tree = render
            (<MessageAligner align="right">
                <div>Child component on the left side</div>
            </MessageAligner>)

        expect(tree).toMatchSnapshot();
    })
})



