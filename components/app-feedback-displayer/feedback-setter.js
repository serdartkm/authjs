import {h} from 'preact'
import {useContext,useState} from 'preact/hooks'
import {FeedbackContext} from '../app-provider'

export default function FeedbackSetter (){

    const fbContext =useContext(FeedbackContext)
    const [value, setValue]=useState({message:'',level:0,code:0,status:0})

   const handleInputChange =(e)=>{
              const {name} = e.target
        setValue((prevState)=>({...prevState,[name]:e.target.value}))

    }   

    return (
        <div style={{display:'flex',flexDirection:'column', height:150,justifyContent:'space-between'}}>
            <input data-testid="messageid" type="text" name="message" value={value.message} onInput={handleInputChange} />
            <input data-testid="levelid" type="number" name="level" value={value.level} onInput={handleInputChange} />
            <input data-testid="codeid" type="number" name="code" value={value.code} onInput={handleInputChange} />
            <input data-testid="statusid" type="number" name="status" value={value.status} onInput={handleInputChange} />
            <button data-testid="change-feedback" onClick={fbContext.changeFeed(value)}>Change Feedback</button>
        </div>
    )
}
