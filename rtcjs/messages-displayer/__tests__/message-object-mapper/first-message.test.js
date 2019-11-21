import{h} from 'preact'
import  render from 'preact-render-to-string';
import FirstMessage from '../../lib/message-object-mapper/first-message'

describe("SNAPSHOT TEST FirstMessage component snapshot",()=>{
    it("Message local renders correctly",()=>{
        const tree =render(<FirstMessage FirstMessage datetime={1569393960355} message="First Message" letter="m" local />)
         expect(tree).toMatchSnapshot();
    })

    it("Message remote renders correctly",()=>{
        const tree =render(<FirstMessage FirstMessage datetime={1569393960355} message="First Message" letter="m" local={false} />)
     expect(tree).toMatchSnapshot();
    })
})