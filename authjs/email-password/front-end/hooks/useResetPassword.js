import { h } from "preact";
import { useState } from "preact/hooks";
import decode from "jwt-decode";
import useToken from "./useToken";

export default function useResetPassword() {
  const { saveToken } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function resetPassword({ password, token }) {
    try {
      setLoading(true);
      const response = await fetch("/change", {
        method: "POST",
        body: JSON.stringify({ password, token })
      });
      const decoded = decode(response.json().token);
      saveToken(decoded.email, response.json().token);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }
  return { resetPassword, loading, error };
}
