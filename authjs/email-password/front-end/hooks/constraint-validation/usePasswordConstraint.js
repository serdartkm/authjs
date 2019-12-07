import {h} from 'preact'
import {useState, useEffect} from 'preact/hooks'
import messages from './constMessages'

const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/i;


export default function usePasswordConstraint({password}){

    const [passwordValidation,setPasswordValidation]=useState({valid:false,message:messages.INVALID_PASSWORD_FORMAT  })

     useEffect(()=>{
         if(passwordRegex.test(password)){
             setPasswordValidation({valid:true,message:messages.VALID_PASSWORD_FORMAT})
         }
         else{
             setPasswordValidation({valid:false,message:messages.INVALID_PASSWORD_FORMAT})
         }
     },[password])
return {passwordValidation}
}