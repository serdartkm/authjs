import { h, createContext } from "preact";
import { useState } from "preact/hooks";

export const SnackMessageContext = createContext("feedback");

export default function AppProvider({ children }) {
  const [message, setMessage] = useState('test messages');


 
  return (
    <SnackMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </SnackMessageContext.Provider>
  );
}
