import { h, createContext } from "preact";
import { useState,useEffect } from "preact/hooks";

export const FeedbackContext = createContext("feedback");

export default function AppProvider({ children }) {
  const [feedback, setFeedback] = useState({
    message: "h",
    level: "",
    status: "",
    code: ""
  });

  function changeFeed (feed){
          console.log("feed",feed)  
    setFeedback(feed)
  }
 
  return (
    <FeedbackContext.Provider value={{ feedback, changeFeed }}>
      {children}
    </FeedbackContext.Provider>
  );
}
