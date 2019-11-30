import {h} from 'preact'

const ScrollerArrows =({scrollHandler})=>{

    return(
        <div style={{position:"absolute",right:'5%',top:'50%'}}>
            <button onClick={()=>{scrollHandler('top')}}>UPWARD</button>
            <button onClick={()=>{scrollHandler('bottom')}}>DOWNWARD</button>
        </div>
    )
}

export default ScrollerArrows