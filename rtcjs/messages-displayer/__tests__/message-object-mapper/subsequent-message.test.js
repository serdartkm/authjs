import{h} from 'preact'
import  render from 'preact-render-to-string';
import  SubsequentMessage  from '../../lib/message-object-mapper/subsequent-message'

describe("SubsequentMessageView snapshot", () => {
    it('renders correctly', () => {
        const tree = render
            (<SubsequentMessage message="hello from subsequent message" datetime={1569393960355} />)

        expect(tree).toMatchSnapshot();
    })
})



