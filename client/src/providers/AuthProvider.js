import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [auth, setAuth] = useState(false);
  const providerValue = {
    isAuthenticated: auth,
    setAuthentication: setAuth,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
