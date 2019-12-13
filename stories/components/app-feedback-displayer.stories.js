import { h } from "preact";
import AppProvider from "../../components/app-provider";
import AppFeedBackDisplayer from "../../components/app-feedback-displayer";
import AppFeedBackSetter from "../../components/app-feedback-displayer/feedback-setter";

export default {
  title: "AppFeedBackDisplayer"
};

export function appFeedbackDisplayer() {
  return (
    <AppProvider>
      <div>
        <AppFeedBackDisplayer/>
        <AppFeedBackSetter />
      </div>
    </AppProvider>
  );
}
