import React from "react";

const LoginContext = React.createContext();

export default function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = React.useState(false);

  function login() {
    setLoggedIn(true);
  }

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        login
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return React.useContext(LoginContext);
}
