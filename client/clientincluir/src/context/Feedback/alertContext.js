import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export default function AlertProvider({ children }) {
  // const [activeAlert, setAlert] = useState(false);
  // const [alertText, setAlertText] = useState("");
  // const [alertColor, setAlertColor] = useState("");
  // const [alertSeverity, setAlertSeverity] = useState("");
  const [feedbackAlert, setAlert] = useState({
    active: false,
    text: "",
    color: "",
    severity: "",
    icon: "",
  });
  const [activeAtentionClass, setActiveAtentionClass] = useState("");

  return (
    <AlertContext.Provider
      value={{
        // activeAlert,
        // setAlert,
        // alertText,
        // setAlertText,
        // alertColor,
        // setAlertColor,
        // alertSeverity,
        // setAlertSeverity,
        feedbackAlert,
        setAlert,
        activeAtentionClass,
        setActiveAtentionClass,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  const {
    // activeAlert,
    // setAlert,
    // alertText,
    // setAlertText,
    // alertColor,
    // setAlertColor,
    // alertSeverity,
    // setAlertSeverity,
    feedbackAlert,
    setAlert,
    activeAtentionClass,
    setActiveAtentionClass,
  } = context;
  return {
    // activeAlert,
    // setAlert,
    // alertText,
    // setAlertText,
    // alertColor,
    // setAlertColor,
    // alertSeverity,
    // setAlertSeverity,
    feedbackAlert,
    setAlert,
    activeAtentionClass,
    setActiveAtentionClass,
  };
}
