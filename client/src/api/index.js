// get list
import makeAuthCall from "./makeAuthCall.js";
import { user } from "auth/AuthContext";

export const getUser = () => {
  const userId = user().user._id;
  return makeAuthCall({}, `/api/user/${userId}`, "GET", false);
};

export const getAllUsers = () => {
  return makeAuthCall({}, `/api/users`, "GET", false);
};

export const addFollowing = body => {
  return makeAuthCall(body, `/api/user/follow`, "PUT", false);
};

export const removeFollowing = body => {
  return makeAuthCall(body, `/api/user/unfollow`, "PUT", false);
};

export const addItem = body => {
  return makeAuthCall(body, `api/items/new/${body.list._id}`, "POST");
};

export const getAllListItems = listId => {
  return makeAuthCall({}, `api/list/${listId}/items`, "GET");
};

export const getLists = () => {
  const userId = user().user._id;
  return makeAuthCall({}, `api/lists/by/${userId}`, "GET");
};

export const createList = body => {
  const userId = user().user._id;
  return makeAuthCall(body, `api/lists/new/${userId}`, "POST");
};

export const deleteItem = id => {
  return makeAuthCall({}, `api/items/${id}`, "DELETE");
};

export const registerUser = user => {
  return makeAuthCall(user, "/api/user/register", "POST", {
    authRequired: false
  });
};

export const loginUser = user => {
  return makeAuthCall(user, "/api/user/login", "POST", { authRequired: false });
};
