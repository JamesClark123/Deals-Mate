// get list
import makeAuthCall from "./makeAuthCall.js";
import { isAuthenticated } from "../auth/index.js";

export const getUser = () => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall({}, `/api/user/${userId}`, "GET", false);
};

export const getAllUsers = () => {
  return makeAuthCall({}, `/api/users`, "GET", false);
};

export const addItem = body => {
  return makeAuthCall(body, `api/items/new/${body.list._id}`, "POST", false);
};

export const getAllListItems = listId => {
  return makeAuthCall({}, `api/list/${listId}/items`, "GET", false);
};

export const getLists = () => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall({}, `api/lists/by/${userId}`, "GET", false);
};

export const createList = body => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall(body, `api/lists/new/${userId}`, "POST", false);
};

export const deleteItem = id => {
  console.log(id);
  return makeAuthCall({}, `api/items/${id}`, "DELETE", false);
};
