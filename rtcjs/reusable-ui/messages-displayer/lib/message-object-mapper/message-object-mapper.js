/* eslint-disable react/jsx-props-no-spreading */
import { h } from 'preact';
import MessageAligner from './message-aligner';
import FirstMessage from './first-message';
import SubsequentMessage from './subsequent-message';
import DateLinebreak from './date-linebreak';

const MessageObjectMappter = (props) => {
    const { order, dateSpace } = props;
    return (
        <div>
            {dateSpace && <DateLinebreak {...props} />}
            <MessageAligner {...props}>
                {

                    order === 'F' ? <FirstMessage {...props} /> : <SubsequentMessage {...props} />
                }

            </MessageAligner>
        </div>
    );
};

export default MessageObjectMappter;
