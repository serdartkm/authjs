import {h} from 'preact'
import {useContext,useRef,useEffect} from 'preact/hooks'
import Snackbar from 'preact-material-components/Snackbar';
import 'preact-material-components/Snackbar/style.css';
import {FeedbackContext} from '../app-provider'


export default function AppFeedBackDisplayer (){

    const fbContext =useContext(FeedbackContext)
    const input = useRef(null);

  

    useEffect(()=>{
          input.current.MDComponent.show({
            message:"temp message"
          });
    },[fbContext])

    return <Snackbar dismissesOnAction ref={input} />
   
    
}