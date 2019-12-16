import { h, createContext } from "preact";
import { useState,useCallback } from "preact/hooks";

export const SnackMessageContext = createContext("feedback");

export default function AppProvider({ children }) {
  const [message, setValue] = useState('');

 const setMessage =useCallback((msg)=>{
   setValue(msg)
 },[])
 
  return (
    <SnackMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </SnackMessageContext.Provider>
  );
}
