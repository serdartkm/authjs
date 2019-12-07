import { h } from "preact";
import { render, fireEvent, cleanup } from "@testing-library/preact";
import LoginFunction from "../index";

cleanup();
describe("Login test", () => {
  it("User did not enter email, password", done => {
    global.fetch = jest.fn();
    const { getByText } = render(<LoginFunction />);
    fireEvent.click(getByText(/login/i));
    expect(global.fetch).toHaveBeenCalledTimes(0);
    setTimeout(() => {
      expect(getByText(/email or username not provided/i)).toBeVisible();
      expect(getByText(/password not provided/i)).toBeVisible();
      done();
    }, 0);
  });
  it.todo("user entered only emai");
  it.todo("user entered only password");
  it("User entered wrong email, password", done => {
    global.fetch = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          return resolve({
            ok: false,
            status: 401,
            json: () => {
              return { token: null };
            }
          });
        }, 0)
      );
    });

    const { getByTestId, getByText, getAllByText } = render(<LoginFunction />);
    fireEvent.input(getByTestId(/email/i), {
      target: { value: "test@gmail.com" }
    });
    fireEvent.input(getByTestId(/password/i), {
      target: { value: "testpassword" }
    });
    expect(getByText(/login/i)).toBeEnabled();
    fireEvent.click(getByText(/login/i));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(
        getAllByText(/email,username or password did not match/i)[0]
      ).toBeVisible();
      expect(
        getAllByText(/email,username or password did not match/i)[1]
      ).toBeVisible();

      done();
    }, 0);
  });

  it("User entered correct email, password", done => {
    global.fetch = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          return resolve({
            ok: true,
            status: 200,
            json: () => {
              return { token: "testtoken" };
            }
          });
        }, 0)
      );
    });

    const { getByTestId, getByText } = render(<LoginFunction />);
    fireEvent.input(getByTestId(/email/i), {
      target: { value: "test@gmail.com" }
    });
    fireEvent.input(getByTestId(/password/i), {
      target: { value: "testpassword" }
    });
    expect(getByText(/login/i)).toBeEnabled();
    fireEvent.click(getByText(/login/i));
    expect(global.fetch).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      //   expect(
      //     getAllByText(/email,username or password did not match/i)[0]
      //   ).not.toBeVisible();
      //   expect(
      //     getAllByText(/email,username or password did not match/i)[1]
      //   ).not.toBeVisible();

      done();
    }, 0);
  });

  it.todo("fetch response rejected");
});
