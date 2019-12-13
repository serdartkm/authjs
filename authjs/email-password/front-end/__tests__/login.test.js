import { h } from "preact";
// import { render, fireEvent, cleanup } from "@testing-library/preact";
// import LoginFunction from "../index";

// cleanup();
describe("Login test", () => {
describe('negative testing',()=>{
  it.todo('user entered only email, or userName')  // BAD REQUEST 400
  it.todo('user entered only password')  // BAD REQUEST 400
  it.todo('user enteren incorrect username, email or password')  // BAD REQUEST 400
  it.todo('internal server error') // 500 >=
  it.todo('fetch api call is rejected') // NETWORK ERROR OR USER IS OFFLINE

})
describe('positive testing',()=>{
  it.todo('user enteren correct username, email or password')
})
});
