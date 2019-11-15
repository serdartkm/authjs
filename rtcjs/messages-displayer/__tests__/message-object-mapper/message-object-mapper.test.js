import{h} from 'preact'
import  render from 'preact-render-to-string';
import MessageObjectMapper from '../../lib/message-object-mapper/message-object-mapper'

describe("SNAPSHOT TEST MessageObjectMapper", () => {

    it("MessageObjectMapper renders correctly", () => {

        const tree = render
            (<MessageObjectMapper datetime={1569393960355} side="right" message="hello" letter="F" order="F" local={true} dateSpace={true} />)

        expect(tree).toMatchSnapshot();
    })

})
