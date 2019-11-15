import{h} from 'preact'
import MessageDateLine from '../../lib/message-object-mapper/date-linebreak'
import  render from 'preact-render-to-string';


describe("MessageDateLine component snapshot",()=>{
    it("renders correctly",()=>{
        const tree =render(<MessageDateLine datetime={1569393960355}/>)
         expect(tree).toMatchSnapshot();
    })
})
