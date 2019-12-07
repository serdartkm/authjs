import {h} from 'preact'
import {useState, useEffect} from 'preact/hooks'
import messages from './constMessages'

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default function useEmailCostraint({email}){

const [emailValidation,setEmailValidation] =useState({valid:false,message:messages.INVALID_EMAIL_FORMAT})


useEffect(()=>{
    if(emailRegex.test(email)){
        setEmailValidation({valid:true,message:messages.VALID_EMAIL_FORMAT})
    }
    else{
        setEmailValidation({valid:false,message:messages.INVALID_EMAIL_FORMAT})
    }
},[email])

return {emailValidation}

}