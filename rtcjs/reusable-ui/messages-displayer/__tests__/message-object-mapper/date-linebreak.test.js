import{h} from 'preact'
import  render from 'preact-render-to-string';
import MessageDateLine from '../../lib/message-object-mapper/date-linebreak'


describe("MessageDateLine component snapshot",()=>{
    it("renders correctly",()=>{
        const tree =render(<MessageDateLine datetime={1569393960355} />)
         expect(tree).toMatchSnapshot();
    })
})
