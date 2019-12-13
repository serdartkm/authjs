import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { signupResponse } from "http-response-status";
import useToken from "./useToken";
import useConstraintValidation from "./constraint-validation";
import useFormInput from "./useFormInput";


export default function useSignUp() {
  const { userName, password, email, onInput } = useFormInput({
    email: "",
    password: "",
    userName: ""
  });
  const {
    emailValidation,
    passwordValidation,
    userNameValidation
  } = useConstraintValidation({ userName, email, password });
  const [serverValidation, setServerValidation] = useState({
    email: { valid: true, message: "" },
    userName: { valid: true, message: "" }
  });
  const { saveToken } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  function signUp() {
    async function callapi() {
      if (
        emailValidation.valid &&
        userNameValidation.valid &&
        passwordValidation.valid &&
        email !== "" &&
        userName !== "" &&
        password !== ""
      ) {
        try {
          setLoading(true);

          const res = await fetch("/signup", {
            method: "POST",
            body: JSON.stringify({ email, userName, password })
          });
          await setResponse(res);
            debugger
          setLoading(false);
        } catch (e) {
          setError(e);
        }
      }
    }
    callapi();
  }

  useEffect(() => {
    if (response !== null && response !== undefined) {
 debugger
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
          debugger
        } else if (response.status.ok) {
          saveToken(response.json().token);
        }
      }
    }
  }, [response]);


  useEffect(()=>{

    console.log("serverValidation",serverValidation)
    debugger

  

  },[serverValidation])

  return {
    signUp,
    onInput,
    loading,
    error,
    password,
    email,
    userName,
    emailValidation,
    passwordValidation,
    userNameValidation,
    serverValidation
  };
}
