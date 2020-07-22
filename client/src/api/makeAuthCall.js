import { user } from "auth/";

const makeAuthCall = (
  body,
  url,
  method,
  { isForm = false, authRequired = true } = {}
) => {
  const makeFormData = () => {
    let formData = new FormData();
    for (let key in body) {
      formData.append(key, body[key]);
    }
  };
  const exportBody =
    method === "GET" || method === "DELETE"
      ? {}
      : !isForm
      ? { body: JSON.stringify(body) }
      : { body: makeFormData() };

  return fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authRequired ? `Bearer ${user().token}` : "",
    },
    ...exportBody,
  })
    .then((response) => {
      if (response.status > 299)
        throw `Request failed with status: ${response.status}`;
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default makeAuthCall;
