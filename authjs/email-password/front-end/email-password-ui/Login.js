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

export default function Login({
  disabled = false,
  loading,
  email,
  password,
  onInput,
  login,
 emailValidation= {valid:true,message:''},
 passwordValidation= {valid:true,message:''}
}) {
  return (
    <Elevation z={2}>
      <div style={{ display: "flex", flexDirection: "column", padding: 3 }}>
        <TextField
          data-testid="email" 
          fullwidth
          helperText={emailValidation.message}
          helperTextValidationMsg
          valid={emailValidation.valid}
          onInput={onInput}
          value={email}
          outerStyle={{ marginBottom: 5 }}
         // label="Email, or username"
          type="text"
          name="email"
        />
        <TextField
          data-testid="password" 
          valid={passwordValidation.valid}
          helperText={passwordValidation.message}
          helperTextValidationMsg
          fullwidth
          onInput={onInput}
          value={password}
          outerStyle={{ marginBottom: 5 }}
        //  label="Password"
          type="password"
          name="password"
        />
        <Button onClick={login} ripple raised disabled={loading}>
          Login
        </Button>
        <LinearProgress data-testid="login-progress" indeterminate={loading} />
       
      </div>
    </Elevation>
  );
}

/*
mdc-linear-progress__bar-inner
*/
