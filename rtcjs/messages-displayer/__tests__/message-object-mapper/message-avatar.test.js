import{h} from 'preact'
import MessageAvatar from '../../lib/message-object-mapper/message-avatar'
import  render from 'preact-render-to-string';

describe("SNAPSHOT TEST MessageAvatar",()=>{

    it("MessageAvatar renders correctly",()=>{
        const tree = render(<MessageAvatar letter="A"/>)

        expect(tree).toMatchSnapshot();

    })
})