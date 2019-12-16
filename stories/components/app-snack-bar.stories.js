import { h } from "preact";
import AppSnackBar from "../../components/app-snack-bar";
import AppProvider from '../../components/app-provider'

export default {
  title: "AppSnack"
};

export function appSnackBar() {
  return (
    <AppProvider>
   <AppSnackBar />
    </AppProvider>
 
  );
}
