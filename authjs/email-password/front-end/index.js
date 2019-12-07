import { h } from "preact";
import useLogin from "./hooks/useLogin";
import LoginMaterial from "./email-password-ui/Login";
import SignUpMaterial from "./email-password-ui/SignUp";
import useSignUp from "./hooks/useSignUp";

export default function LoginFunction() {
  const {
    login,
    error,
    loading,
    email,
    password,
    onInput,
    emailValidation,
    passwordValidation,
  } = useLogin();

  return (
    <LoginMaterial
      emailValidation={emailValidation}
      passwordValidation={passwordValidation}
      onInput={onInput}
      email={email}
      password={password}
      login={login}
      disabled={loading || email === "" || password === ""}
      error={error}
    />
  );
}

export function SignUpFunction() {
  const {
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
  } = useSignUp();

  return (
    <SignUpMaterial
      serverValidation={serverValidation}
      emailValidation={emailValidation}
      passwordValidation={passwordValidation}
      userNameValidation={userNameValidation}
      signUp={signUp}
      onInput={onInput}
      error={error}
      loading={loading}
      password={password}
      email={email}
      userName={userName}
    />
  );
}
