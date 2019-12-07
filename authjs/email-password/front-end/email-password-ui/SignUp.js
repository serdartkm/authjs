import { h } from "preact";
import TextField from "preact-material-components/TextField";
import "preact-material-components/TextField/style.css";
import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import Elevation from "preact-material-components/Elevation";
import "preact-material-components/Elevation/style.css";
import LinearProgress from "preact-material-components/LinearProgress";
import "preact-material-components/LinearProgress/style.css";

export default function SignUp({
  userName,
  password,
  email,
  disabled,
  loading,
  emailValidation = { valid: true, message: "" },
  userNameValidation = { valid: true, message: "" },
  passwordValidation = { valid: true, message: "" },
  serverValidation={email:{valid:true,message:''},userName:{valid:true,message:''}},
  onInput,
  signUp
}) {

  return (
    <Elevation z={2}>
      <div style={{ display: "flex", flexDirection: "column", padding: 3 }}>
        <TextField
          onInput={onInput}
          name="userName"
          fullwidth
          data-testid="userName"
          outerStyle={{ marginBottom: 5 }}
          type="text"
          helperText={userNameValidation.message||serverValidation.userName.message}
          helperTextValidationMsg
          valid={userNameValidation.valid && serverValidation.userName.valid}
          value={userName}
    
        />
        <TextField
          onInput={onInput}
          name="email"
          fullwidth
          data-testid="email"
          outerStyle={{ marginBottom: 5 }}
          type="email"
          helperText={emailValidation.message|| serverValidation.email.message}
          helperTextValidationMsg
          valid={emailValidation.valid && serverValidation.email.valid}
          value={email}
        />
        <TextField
          onInput={onInput}
          name="password"
          fullwidth
          data-testid="password"
          outerStyle={{ marginBottom: 5 }}
          type="password"
          helperText={passwordValidation.message}
          helperTextValidationMsg
          valid={passwordValidation.valid}
          value={password}
        />
        <Button ripple raised disabled={disabled} onClick={signUp}>
          SignUp
        </Button>
        <LinearProgress indeterminate={loading} />
      </div>
    </Elevation>
  );
}
