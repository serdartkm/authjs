import {h} from 'preact'
import {useState, useEffect} from 'preact/hooks'
import messages from './constMessages'

const usernameRegix = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/i;

export default function useUserNameConstraint({userName}){

const[userNameValidation,setUserNameValidation]=useState({valid:false,message:messages.INVALID_USERNAME_FORMAT})


useEffect(()=>{
    if(usernameRegix.test(userName)){
        setUserNameValidation({valid:true,message:messages.VALID_USERNAME_FORMAT})
    }
    else{
        setUserNameValidation({valid:false, message:messages.INVALID_USERNAME_FORMAT})
    }
},[userName])



return {userNameValidation}
}