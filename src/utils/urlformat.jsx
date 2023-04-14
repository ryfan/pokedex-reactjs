export function formatUrlWithQueries(url, queries) {
 const urlObj = new URL(url);
 urlObj.search = new URLSearchParams(queries).toString();
 return urlObj.toString();
}
