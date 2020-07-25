// get list
import makeAuthCall from "./makeAuthCall.js";

export const deleteAccount = () => {
  return makeAuthCall({}, `/api/user`, "DELETE");
};

export const addItemToList = (body) => {
  return makeAuthCall({}, `api/lists/${body.listId}/${body.itemId}`, "POST");
};

export const addItem = (body) => {
  return makeAuthCall(body, `api/items/new/`, "POST");
};

export const getAllListItems = (listId) => {
  return makeAuthCall({}, `api/lists/${listId}`, "GET");
};

export const getLists = () => {
  return makeAuthCall({}, `api/lists`, "GET");
};

export const createList = (body) => {
  return makeAuthCall(body, `api/lists/new`, "POST");
};

export const removeItem = (listId, itemId) => {
  return makeAuthCall({}, `api/lists/${listId}/${itemId}`, "DELETE");
};

export const registerUser = (user) => {
  return makeAuthCall(user, "/api/user/register", "POST", {
    authRequired: false,
  });
};

export const loginUser = (user) => {
  return makeAuthCall(user, "/api/user/login", "POST", { authRequired: false });
};
