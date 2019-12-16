import { h } from "preact";
import { useRef, useEffect, useContext } from "preact/hooks";
import Snackbar from "preact-material-components/Snackbar";
import "preact-material-components/Snackbar/style.css";
import { SnackMessageContext } from "../app-provider";

export default function AppSnackBar() {
  const input = useRef(null);
  const snackBarMessageContext = useContext(SnackMessageContext);
  useEffect(() => {

    if( snackBarMessageContext.message !==''){
      input.current.MDComponent.show({
        message: snackBarMessageContext.message
      });
    }

  }, [snackBarMessageContext]);

  return <Snackbar timeout={0} data-testid="snack" dismissesOnAction ref={input} />;
}
