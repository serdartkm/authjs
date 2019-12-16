import {h} from 'preact'
import {useState} from 'preact/hooks'
import { signupResponse } from "http-response-status";

export default function useServerValidation (){

    const [serverValidation, setServerValidation]= useState({
        email: { valid: true, message: "" },
        userName: { valid: true, message: "" }
      })


   function validate (response){
    if (response !== null && response !== undefined) {
     
                    if (response.status === signupResponse.BadRequest.status) {
                      if (response.code === signupResponse.BadRequest.USERNAME_TAKEN.code) {
                        setServerValidation(prevState => {
                          return {
                            ...prevState,
                            userName: { valid: false, message: response.json().message }
                          };
                        });
                      } else if (
                        response.code === signupResponse.BadRequest.EMAIL_TAKEN.code
                      ) {
                        setServerValidation(prevState => {
                          return {
                            ...prevState,
                            email: { valid: false, message: response.json().message }
                          };
                        });
                      } else if (
                        response.code === signupResponse.BadRequest.EMAIL_USERNAME_TAKEN.code
                      ) {
                        setServerValidation({
                          email: { valid: false, message: response.json().message },
                          userName: { valid: false, message: response.json().message }
                        });
                  
                      }
                    }
                  }
        
   }
    return {serverValidation,validate}

}
