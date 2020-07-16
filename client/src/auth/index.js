import axios from "axios";
import jwt from "jwt-decode";

export const register = user => {
  return fetch(`/api/user/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const login = user => {
  return fetch(`/api/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const setToken = (token, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(token));
  }
  next();
};

export const logout = async () => {
  await localStorage.removeItem("token");
  return;
};

export const user = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const authentication = () => {
  return jwt(JSON.parse(localStorage.getItem("token")).token);
  //   if (isAuthenticated()) {
  //   } else {
  // logout();
  //   }
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
    const token = authentication();
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
