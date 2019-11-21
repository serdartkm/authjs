import{h} from 'preact'
import  render from 'preact-render-to-string';
import MessageAvatar from '../../lib/message-object-mapper/message-avatar'

describe("SNAPSHOT TEST MessageAvatar",()=>{

    it("MessageAvatar renders correctly",()=>{
        const tree = render(<MessageAvatar letter="A" />)

        expect(tree).toMatchSnapshot();

    })
})