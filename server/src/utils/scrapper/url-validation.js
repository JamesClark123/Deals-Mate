export function isUrl(url) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "amazon.com|www.amazon.com" + // domain name
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}

export function getBaseUrl(url) {
  if (url.includes("ref=")) return url.split("ref=")[0];
  if (url.includes("?")) return url.split("?")[0];
  return url;
}
