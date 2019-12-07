import { h } from "preact";
import { useState } from "preact/hooks";
import useToken from "./useToken";

export default function useLogOut() {
  const { removeToken } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function logOut({ token, email }) {
    try {
      setLoading(true);
      const response = await fetch("/logout", {
        method: "POST",
        body: JSON.stringify({ token })
      });
      setResult(response.json());
      removeToken(email);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }

  return { result, loading, logOut, error };
}
