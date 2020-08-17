import axios from "axios";
import jwt from "jwt-decode";
import { registerUser, loginUser, deleteAccount } from "api/";

/** Returns true if successfully registered  */
export async function register(user) {
  await registerUser(user);
}

/** Returns true is successfully logged in */
export async function login(user) {
  try {
    const response = await loginUser(user);
    setToken(response);
  } catch (err) {
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

export const deleteUserAccount = async () => {
  return await deleteAccount();
};

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const getUser = () => {
  return getLocalStorage().user;
};

export const getToken = () => {
  return getLocalStorage().token;
};

export const getAuthentication = () => {
  return jwt(getToken());
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
