import { h } from "preact";
import { render, fireEvent, cleanup } from "@testing-library/preact";

import httpResponse from "../../../../http-response-status";
import { SignUpFunction } from "../index";
import messages from "../hooks/constraint-validation/constMessages";

cleanup();
describe("signup testing", () => {
  describe("negative testing", () => {
    it("username, email, password fields are empty", () => {
      global.fetch = jest.fn();
      
      const { getByText, getByTestId } = render(<SignUpFunction />);
      // input values for username,email,password are empty
      expect(getByTestId(/userName/i)).toHaveValue("");
      expect(getByTestId(/email/i)).toHaveValue("");
      expect(getByTestId(/password/i)).toHaveValue("");
      // click signup button
      fireEvent.click(getByText(/signup/i));
      // user can see input constraint error for  username, email,password
      expect(getByTestId(/userName/i)).toHaveAttribute(
        "helpertext",
        messages.INVALID_USERNAME_FORMAT
      );
      expect(getByTestId(/password/i)).toHaveAttribute(
        "helpertext",
        messages.INVALID_PASSWORD_FORMAT
      );
      expect(getByTestId(/email/i)).toHaveAttribute(
        "helpertext",
        messages.INVALID_EMAIL_FORMAT
      );
      // fetch api should not be called bacause of credentials constraint errors
      expect(global.fetch).toHaveBeenCalledTimes(0);
    
    });

    it("invalid email, username format", () => {
      global.fetch = jest.fn()
      const { getByText, getByTestId } = render(<SignUpFunction />);
      // input incorrect format for username,email,password
      fireEvent.input(getByTestId(/username/i), {
        target: { value: "serdar!" }
      });
      fireEvent.input(getByTestId(/email/i), {
        target: { value: "testdgmail.com" }
      });
      fireEvent.input(getByTestId(/password/i), { target: { value: "1233" } });
      // input values username,email,password are visible to the user
      expect(getByTestId(/userName/i)).toHaveValue("serdar!");
      expect(getByTestId(/email/i)).toHaveValue("testdgmail.com");
      expect(getByTestId(/password/i)).toHaveValue("1233");
      // click signup button
      fireEvent.click(getByText(/signup/i));
      expect(getByTestId(/email/i)).toHaveAttribute(
        "helpertext",
        messages.INVALID_EMAIL_FORMAT
      );
      // error messages for incorrect format are visible for user
      expect(getByTestId(/password/i)).toHaveAttribute(
        "helpertext",
        messages.INVALID_PASSWORD_FORMAT
      );
      expect(getByTestId(/userName/i)).toHaveAttribute(
        "helpertext",
        messages.INVALID_USERNAME_FORMAT
      );
      // fetch api call to the server did not get called because of input constraint error
      expect(global.fetch).toHaveBeenCalledTimes(0);
     
    });

    it.todo("network error");

    it.todo("server error");
  });

  describe("positive testing", () => {
    it("valid username, email, password", () => {
      global.fetch = jest.fn();
      const { getByText, getByTestId } = render(<SignUpFunction />);
      // input values for username,password, email with correct format
      fireEvent.input(getByTestId(/username/i), {
        target: { value: "serdar" }
      });
      fireEvent.input(getByTestId(/email/i), {
        target: { value: "tkm.house.new@gmail.com" }
      });

      fireEvent.input(getByTestId(/password/i), {
        target: { value: "pop@1332YUI_d33*&kk" }
      });
      // input values visible to user
      expect(getByTestId(/username/i)).toHaveValue("serdar");
      expect(getByTestId(/email/i)).toHaveValue("tkm.house.new@gmail.com");
      expect(getByTestId(/password/i)).toHaveValue("pop@1332YUI_d33*&kk");
      // click signup button
      fireEvent.click(getByText(/signup/i));
      // not constrain error is visible
      expect(getByTestId(/email/i)).toHaveAttribute("helpertext", "");
      expect(getByTestId(/password/i)).toHaveAttribute("helpertext", "");
      expect(getByTestId(/username/i)).toHaveAttribute("helpertext", "");
      // fetch api is called once after positive validation
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    
    it("valid username, email, password but USERNAME IS TAKEN", done => {
      global.fetch = jest.fn().mockImplementationOnce(() => {
        return new Promise((resolve, reject) =>
          resolve({
            ok: false,
            status: httpResponse.USERNAME_TAKEN.status,
            json: () => {
              return { message: httpResponse.USERNAME_TAKEN.message };
            }
          })
        );
      });
      const { getByText, getByTestId } = render(<SignUpFunction />);
      // input values for username,password, email with correct format
      fireEvent.input(getByTestId(/username/i), {
        target: { value: "serdar" }
      });
      fireEvent.input(getByTestId(/email/i), {
        target: { value: "tkm.house.new@gmail.com" }
      });

      fireEvent.input(getByTestId(/password/i), {
        target: { value: "pop@1332YUI_d33*&kk" }
      });
      // input values visible to user
      expect(getByTestId(/username/i)).toHaveValue("serdar");
      expect(getByTestId(/email/i)).toHaveValue("tkm.house.new@gmail.com");
      expect(getByTestId(/password/i)).toHaveValue("pop@1332YUI_d33*&kk");
      // click signup button

      fireEvent.click(getByText(/signup/i));
      // not constrain error is visible
      expect(global.fetch).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(getByTestId(/email/i)).toHaveAttribute("helpertext", "");
        expect(getByTestId(/password/i)).toHaveAttribute("helpertext", "");
        expect(getByTestId(/username/i)).toHaveAttribute(
          "helpertext",
          httpResponse.USERNAME_TAKEN.message
        );
        done();
      }, 0);
      // fetch api is called once after positive validation
    });

    it("valid username, email, password but EMAIL IS TAKEN", done => {
      global.fetch = jest.fn().mockImplementationOnce(() => {
        return new Promise((resolve, reject) =>
          resolve({
            ok: false,
            status: httpResponse.EMAIL_TAKEN.status,
            json: () => {
              return { message: httpResponse.EMAIL_TAKEN.message };
            }
          })
        );
      });
      const { getByText, getByTestId } = render(<SignUpFunction />);
      // input values for username,password, email with correct format
      fireEvent.input(getByTestId(/username/i), {
        target: { value: "serdar" }
      });
      fireEvent.input(getByTestId(/email/i), {
        target: { value: "tkm.house.new@gmail.com" }
      });

      fireEvent.input(getByTestId(/password/i), {
        target: { value: "pop@1332YUI_d33*&kk" }
      });
      // input values visible to user
      expect(getByTestId(/username/i)).toHaveValue("serdar");
      expect(getByTestId(/email/i)).toHaveValue("tkm.house.new@gmail.com");
      expect(getByTestId(/password/i)).toHaveValue("pop@1332YUI_d33*&kk");
      // click signup button

      fireEvent.click(getByText(/signup/i));
      // not constrain error is visible
      expect(global.fetch).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(getByTestId(/userName/i)).toHaveAttribute("helpertext", "");
        expect(getByTestId(/password/i)).toHaveAttribute("helpertext", "");
        expect(getByTestId(/email/i)).toHaveAttribute(
          "helpertext",
          httpResponse.EMAIL_TAKEN.message
        );
        done();
      }, 0);
      // fetch api is called once after positive validation
    });


    it("valid username, email, password but EMAIL AND USERNAME IS TAKEN", done => {
      global.fetch = jest.fn().mockImplementationOnce(() => {
        return new Promise((resolve, reject) =>
          resolve({
            ok: false,
            status: httpResponse.EMAIL_USERNAME_TAKEN.status,
            json: () => {
              return { message: httpResponse.EMAIL_USERNAME_TAKEN.message };
            }
          })
        );
      });
      const { getByText, getByTestId } = render(<SignUpFunction />);
      // input values for username,password, email with correct format
      fireEvent.input(getByTestId(/username/i), {
        target: { value: "serdar" }
      });
      fireEvent.input(getByTestId(/email/i), {
        target: { value: "tkm.house.new@gmail.com" }
      });

      fireEvent.input(getByTestId(/password/i), {
        target: { value: "pop@1332YUI_d33*&kk" }
      });
      // input values visible to user
      expect(getByTestId(/username/i)).toHaveValue("serdar");
      expect(getByTestId(/email/i)).toHaveValue("tkm.house.new@gmail.com");
      expect(getByTestId(/password/i)).toHaveValue("pop@1332YUI_d33*&kk");
      // click signup button

      fireEvent.click(getByText(/signup/i));
    
         // fetch api is called once after positive validation
      expect(global.fetch).toHaveBeenCalledTimes(1);
      setTimeout(() => {
          // not constrain error is visible
        expect(getByTestId(/userName/i)).toHaveAttribute("helpertext", httpResponse.EMAIL_USERNAME_TAKEN.message);
        expect(getByTestId(/password/i)).toHaveAttribute("helpertext", "");
        expect(getByTestId(/email/i)).toHaveAttribute(
          "helpertext",
          httpResponse.EMAIL_USERNAME_TAKEN.message
        );
        done();
      }, 0);
   
    });
  });
});
