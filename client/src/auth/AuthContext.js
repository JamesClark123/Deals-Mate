import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { registerUser, loginUser } from "api/";

const AuthContext = createContext();
export default AuthContext;

export function AuthContextProvider(props) {
  const [auth, setAuth] = useState(false);
  const providerValue = {
    isAuthenticated: auth,
    setAuthentication: setAuth
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setAuth(true);
      setAuthToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

/** Returns true if successfully registered  */
export async function register(user) {
  try {
    await registerUser(user);
    return true;
  } catch {
    return false;
  }
}

/** Returns true is successfully logged in */
export async function login(user) {
  try {
    const response = await loginUser(user);
    setToken(response);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(token));
  }
}

export const logout = async () => {
  await localStorage.removeItem("token");
  return;
};

export const user = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const getAuthentication = () => {
  return jwt(user().token);
};

// check authentication
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  let token;
  try {
    const user = localStorage.getItem("token");
    token = jwt(JSON.parse(user).token);
  } catch {
    return false;
  }

  if (token && Date.now() <= token.exp * 1000) {
    return true;
  } else {
    return false;
  }
};

export const setAuthToken = () => {
  if (isAuthenticated()) {
    const token = getAuthentication();
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Custom hooks into the auth context
export function useSetAuthentication() {
  const authContext = useContext(AuthContext);
  return () => authContext.setAuthentication(true);
}

export function useUnsetAuthentication() {
  const authContext = useContext(AuthContext);
  return () => authContext.setAuthentication(false);
}

export function useLogin() {
  const setAuth = useSetAuthentication();
  async function _(user) {
    if (isAuthenticated()) {
      setAuth();
      return true;
    }
    if (user === undefined) return false;
    try {
      await login(user);
    } catch {
      return false;
    }
    setAuth();
    return true;
  }
  return _;
}

export function useLogout() {
  const unsetAuth = useUnsetAuthentication();
  async function _() {
    if (isAuthenticated()) {
      await logout();
      unsetAuth();
    }
  }
  return _;
}
