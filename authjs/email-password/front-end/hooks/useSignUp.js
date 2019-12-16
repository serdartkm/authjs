import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import useToken from "./useToken";
import useConstraintValidation from "./constraint-validation";
import useFormInput from "./useFormInput";
import useServerValidation from './useServerValidation'

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

  const { saveToken } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const {serverValidation,validate} =useServerValidation(response)
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
          
          setLoading(false);
        } catch (e) {
          setError(e);
        }
      }
    }
    callapi();
  }

  useEffect(() => {

         validate(response)
       if (response !==null && response !==undefined && response.status.ok) {
          saveToken(response.json().token);
        }
      

  }, [response]);



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
