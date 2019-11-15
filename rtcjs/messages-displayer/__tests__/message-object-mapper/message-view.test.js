import{h} from 'preact'
import  render from 'preact-render-to-string';
import MessageView from '../../lib/message-object-mapper/message-view'

describe("MessageView snapshot test",()=>{

    it('renders correctly', () => {
        const tree = render
            (<MessageView message="hello from subsequent message" datetime={1569393960355} />)
        expect(tree).toMatchSnapshot();
    })
})