import { h } from "preact";
import { useState } from "preact/hooks";
import useToken from "./useToken";
import useFormInput from './useFormInput'

export default function useLogin() {
  const { saveToken } = useToken;
  const [loading, setLoading] = useState(false);
  const [emailValidation,setEmailValidation] =useState({valid:true,message:''})
  const [passwordValidation,setPasswordValidation]=useState({valid:true,message:''})
  const [error, setError] = useState(null);
  const {value, onInput} = useFormInput({ email: "", password: "" });

  async function login({ password, email }) {
    if (value.email === "" && value.password !=='') {
      setEmailValidation({ valid: false, message: "email or username not provided" });
  
    }
    else
    if (value.password === "" && value.email !=='') {
      setPasswordValidation({ valid: false, message: "password not provided" });
    
    }
    else
    if(value.email==='' && value.password===''){
      setEmailValidation({valid:false, message:'email or username not provided'})
      setPasswordValidation({ valid: false, message: "password not provided" });
   
    }
  
    else{

  
    
    try {
      setLoading(true);
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ password, email })
      });
  
      if (response.ok) {
    
        saveToken(email, response.json().token);
        setLoading(false);
        return  
      }
      // validation error
      if (response.status === 401) {
        setEmailValidation({valid:false, message:'email,username or password did not match'})
        setPasswordValidation({ valid: false, message: 'email,username or password did not match' });
      }
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }
  }

  return {
    loading,
    error,
    login,
    onInput,
  ...value,
    passwordValidation,
    emailValidation
  };
}
