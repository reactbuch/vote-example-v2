import React from "react";

type LoginContextType = {
  loggedIn: boolean;
  login: () => void;
};

const LoginContext = React.createContext<LoginContextType>({
  loggedIn: false,
  login: () => null
});

type LoginProviderProps = {
  children: React.ReactElement | null;
};

export default function LoginProvider({ children }: LoginProviderProps) {
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
