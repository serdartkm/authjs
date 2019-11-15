import{h} from 'preact'
import  SubsequentMessage  from '../../lib/message-object-mapper/subsequent-message'
import  render from 'preact-render-to-string';
describe("SubsequentMessageView snapshot", () => {
    it('renders correctly', () => {
        const tree = render
            (<SubsequentMessage message="hello from subsequent message" datetime={1569393960355} />)

        expect(tree).toMatchSnapshot();
    })
})



