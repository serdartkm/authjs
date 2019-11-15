import{h} from 'preact'
import FirstMessage from '../../lib/message-object-mapper/first-message'
import  render from 'preact-render-to-string';

describe("SNAPSHOT TEST FirstMessage component snapshot",()=>{
    it("Message local renders correctly",()=>{
        const tree =render(<FirstMessage  FirstMessage datetime={1569393960355} message="First Message" letter ="m" local={true}/>)
         expect(tree).toMatchSnapshot();
    })

    it("Message remote renders correctly",()=>{
        const tree =render(<FirstMessage  FirstMessage datetime={1569393960355} message="First Message" letter ="m" local={false}/>)
     expect(tree).toMatchSnapshot();
    })
})