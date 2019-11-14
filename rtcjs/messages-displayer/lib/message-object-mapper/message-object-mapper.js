import {h} from 'preact'
import MessageAligner from './message-aligner'
import FirstMessage from './first-message'
import SubsequentMessage from './subsequent-message'
import DateLinebreak from './date-linebreak'
import PropTypes from 'prop-types'
const MessageObjectMappter = (props) => {
    const { order, dateSpace } = props
    return (<div>
        {dateSpace && <DateLinebreak {...props} />}
        <MessageAligner {...props}>{
            order === "F" ? <FirstMessage {...props} /> : <SubsequentMessage {...props} />
        }</MessageAligner>
    </div>)
}
/*
MessageObjectMappter.propTypes={
    message:PropTypes.exact({
      //  message:PropTypes.string.isRequired,//
        datetime:PropTypes.number.isRequired,
        local:PropTypes.bool.isRequired,    
        side:PropTypes.oneOf(['left','right']).isRequired,
        order:PropTypes.oneOf(['F','S']).isRequired,
        dateSpace:PropTypes.bool.isRequired
    })
}
*/
export default MessageObjectMappter


