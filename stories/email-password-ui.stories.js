/* eslint-disable import/no-unresolved */
import { h } from "preact";
import Login from "email-password-ui/Login";
import RecoverPassword from "email-password-ui/RecoverPassword";
import ResetPassword from "email-password-ui/ResetPassword";
import SignUp from "email-password-ui/SignUp";

export default {
  title: "EmailPassword"
};

export const login = () => {
  return <Login disabled={false} error="This is an error" />;
};

export const loginDisabled = () => {
  return <Login disabled loading />;
};

export const loginInValid = () => {
  return (
    <Login
      emailValidation={{
        valid: false,
        message: "email or username not provided"
      }}
      passwordValidation={{ valid: false, message: "password on provided" }}
    />
  );
};

export const recoverPassword = () => {
  return <RecoverPassword />;
};

export const recoverPasswordDisabled = () => {
  return <RecoverPassword disabled loading />;
};

export const resetPassword = () => {
  return <ResetPassword />;
};

export const resetPasswordDisabled = () => {
  return <ResetPassword disabled loading />;
};

export const signUp = () => {
  return <SignUp />;
};

export const signUpDisabled = () => {
  return <SignUp disabled loading />;
};

export const signUpInvalid = () => {
  return (
    <SignUp
      loading
      emailValidation={{ valid: false, message: "invalid email format" }}
      usernameValidation={{valid:false,message:'invalid username'}}
      passwordValidation={{valid:false,message:'invalid password'}}
    />
  );
};
