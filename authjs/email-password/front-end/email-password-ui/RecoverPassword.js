import {h} from 'preact'
import TextField from "preact-material-components/TextField";
import "preact-material-components/TextField/style.css";
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/Elevation/style.css';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';

export default function RecoverPassword({disabled,loading,  validation={valid:true,message:''}}){
return(
    <Elevation z={2}>
    <div style={{display:"flex",flexDirection:"column",padding:3}}>
      <TextField outerStyle={{marginBottom:5}} label="Email" type="email" />
      <Button ripple raised disabled={disabled}>
         Recover Password
      </Button>
      <LinearProgress indeterminate={loading} />
    </div>
    </Elevation>
)
}