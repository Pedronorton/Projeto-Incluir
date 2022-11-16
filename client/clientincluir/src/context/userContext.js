import React, { createContext, useContext, useState } from "react";
import Cookie from "js-cookie";
const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [credential, setCredential] = useState("");
  const [language, setLanguage] = useState("pt");
  const [automaton, setAutomaton] = useState("pt");
  const [isActiveTutorial, setActiveTutorial] = useState(false);
  const [isActiveUserDialog, setActiveUserDialog] = useState(false);
  const [isActiveChangePasswordDialog, setActiveChangePasswordDialog] =
    useState(false);
  const [
    isActiveTransformationAlgorithmDialog,
    setActiveTransformationAlgorithmDialog,
  ] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActiveDialogHowToUseGrammar, setActiveDialogHowToUseGrammar] =
    useState(false);
  const [isAuth, setIsAuth] = useState(!!Cookie.get("token"));

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        credential,
        setCredential,
        language,
        setLanguage,
        automaton,
        setAutomaton,
        isActiveTutorial,
        setActiveTutorial,
        isActiveUserDialog,
        setActiveUserDialog,
        isActiveDialogHowToUseGrammar,
        setActiveDialogHowToUseGrammar,
        isAuth,
        setIsAuth,
        isAdmin,
        setIsAdmin,
        isActiveTransformationAlgorithmDialog,
        setActiveTransformationAlgorithmDialog,
        isActiveChangePasswordDialog,
        setActiveChangePasswordDialog,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  const {
    user,
    setUser,
    credential,
    setCredential,
    language,
    setLanguage,
    automaton,
    setAutomaton,
    isActiveTutorial,
    setActiveTutorial,
    isActiveUserDialog,
    setActiveUserDialog,
    isActiveDialogHowToUseGrammar,
    setActiveDialogHowToUseGrammar,
    isAuth,
    setIsAuth,
    isAdmin,
    setIsAdmin,
    isActiveTransformationAlgorithmDialog,
    setActiveTransformationAlgorithmDialog,
    isActiveChangePasswordDialog,
    setActiveChangePasswordDialog,
  } = context;
  return {
    user,
    setUser,
    credential,
    setCredential,
    language,
    setLanguage,
    automaton,
    setAutomaton,
    isActiveTutorial,
    setActiveTutorial,
    isActiveUserDialog,
    setActiveUserDialog,
    isActiveDialogHowToUseGrammar,
    setActiveDialogHowToUseGrammar,
    isAuth,
    setIsAuth,
    isAdmin,
    setIsAdmin,
    isActiveTransformationAlgorithmDialog,
    setActiveTransformationAlgorithmDialog,
    isActiveChangePasswordDialog,
    setActiveChangePasswordDialog,
  };
}
