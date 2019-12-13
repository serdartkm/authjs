import { h } from "preact";

import { render,fireEvent,cleanup } from "@testing-library/preact";
import AppProvider from "../../app-provider";
import AppFeedbackDisplayer from "../index";
import FeedBackSetter from "../feedback-setter";
import {signupResponse} from '../../../http-response-status'
cleanup()

describe("app-feedback-displayer", () => {
  it("display message", () => {
    debugger;
    const { getByTestId } = render(
      <AppProvider>
        <div>
          <AppFeedbackDisplayer />
          <FeedBackSetter />
        </div>
      </AppProvider>
    );

    fireEvent.input(getByTestId(/messageid/i), {
        target: { value: signupResponse.BadRequest.USERNAME_TAKEN.message }
      });

      fireEvent.input(getByTestId(/statusid/i), {
        target: { value: signupResponse.BadRequest.USERNAME_TAKEN.status }
      });
      fireEvent.input(getByTestId(/codeid/i), {
        target: { value: signupResponse.BadRequest.USERNAME_TAKEN.code }
      });
      fireEvent.input(getByTestId(/levelid/i), {
        target: { value: 0}
      });

expect(getByTestId(/messageid/i)).toHaveValue(signupResponse.BadRequest.USERNAME_TAKEN.message)
expect(getByTestId(/statusid/i)).toHaveValue(signupResponse.BadRequest.USERNAME_TAKEN.status)
expect(getByTestId(/codeid/i)).toHaveValue(signupResponse.BadRequest.USERNAME_TAKEN.code)
expect(getByTestId(/levelid/i)).toHaveValue(0)
expect(getByTestId(/feedback-message/i)).toHaveTextContent('message :username is taken')

  });

});
