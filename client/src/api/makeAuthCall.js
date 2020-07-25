import { getToken } from "auth/";

const makeAuthCall = async (
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

  let response;
  try {
    response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authRequired ? `Bearer ${getToken()}` : "",
      },
      ...exportBody,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }

  const res = await response.json();
  if (response.status > 399) {
    throw res;
  }
  return res;
};

export default makeAuthCall;
