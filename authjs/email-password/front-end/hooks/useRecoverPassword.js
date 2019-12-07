import { h } from "preact";
import { useState } from "preact/hooks";

export default function useRecoverPassword() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [error, setError] = useState(null);

  async function recoverPassword({ email }) {
    try {
      setLoading(true);
      const response = await fetch("/recover", {
        method: "POST",
        body: JSON.stringify({ email })
      });
      setResult(response.json());
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }
  return { recoverPassword, result, error, loading };
}
