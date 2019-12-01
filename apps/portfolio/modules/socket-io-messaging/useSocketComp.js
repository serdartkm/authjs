import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import io from "socket.io-client";

const useSocketComp = username => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(`/anonymous`, {
          method: "POST",
          body: JSON.stringify({ username }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();

        setSocket(io(REACT_APP_SOCKET_URL, { query: `token=${data.token}` }));
      } catch (error) {
        setSocketError(error);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.on("error", error => {
        setSocketError(error);
      });
      socket.on("connect", () => {
        setConnected(true);
      });
      socket.on("message",()=>{
        
      })
    }
  }, [socket]);
  return { socket, connected, socketError };
};

export default useSocketComp;
