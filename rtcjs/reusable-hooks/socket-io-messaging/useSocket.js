import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import io from "socket.io-client";

const useSocket = ({username,route='/anonymous',serverUrl}) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(route, {
          method: "POST",
          body: JSON.stringify({ username }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();

        setSocket(io(serverUrl, { query: `token=${data.token}` }));
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

export default useSocket;
