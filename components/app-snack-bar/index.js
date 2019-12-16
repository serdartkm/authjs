import { h } from "preact";
import { useRef, useEffect, useContext } from "preact/hooks";
import Snackbar from "preact-material-components/Snackbar";
import "preact-material-components/Snackbar/style.css";
import { SnackMessageContext } from "../app-provider";

export default function AppSnackBar() {
  const input = useRef(null);
  const snackBarMessageContext = useContext(SnackMessageContext);
  useEffect(() => {
    input.current.MDComponent.show({
      message: snackBarMessageContext.message
    });
  }, [snackBarMessageContext]);

  return <Snackbar dismissesOnAction ref={input} />;
}
