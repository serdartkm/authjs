import { h } from "preact";
import { useState } from "preact/hooks";
import decode from "jwt-decode";

export default function useToken() {
  const [token, setToken] = useState();

  function saveToken(key, value) {
    localStorage.setItem(key, value);
    setToken(value);
  }

  function getToken(key) {
    setToken(localStorage.getItem(key));
    return token;
  }

  function removeToken(key) {
    setToken(null);
    localStorage.removeItem(key);
  }

  function isTokenExpired() {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      return true;
    }
    return false;
  }

  function isLoggedIn() {
    // Checks if there is a saved token and it's still valid
    setToken(getToken()); // Getting token from localstorage
    return !!token && !isTokenExpired(token); // handwaiving here
  }

  return { token, saveToken, isLoggedIn, removeToken };
}
