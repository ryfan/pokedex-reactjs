import { formatUrlWithQueries } from './urlformat';

export async function fetchData(
 endpoint = '/',
 queries = {},
 fetchOptions = {}
) {
 let token = localStorage.getItem('token');
 let authorizedHeader = {
  Authorization: `Bearer ${token}`
 };

 let defaultFetchOptions = {
  method: 'GET',
  headers: token ? authorizedHeader : null
 };

 let unformattedUrl;
 if (
  endpoint.startsWith('https://') ||
  endpoint.startsWith('http://') ||
  endpoint.startsWith('ftp://')
 ) {
  unformattedUrl = endpoint;
 } else {
  unformattedUrl = `${process.env.REACT_APP_API_URL}${endpoint}`;
 }
 const url = formatUrlWithQueries(unformattedUrl, queries);
 let fetchResponse = {};
 try {
  fetchResponse = await fetch(url, {
   ...defaultFetchOptions,
   ...fetchOptions,
   headers: {
    ...defaultFetchOptions.headers,
    ...fetchOptions.headers
   }
  });
 } catch (err) {
  throw new Error(`Server connection problem : ${err}`);
 }
 return fetchResponse;
}

export async function apiFetch(
 endpoint = '/',
 queries = {},
 fetchOptions = {}
) {
 const fetchResponse = await fetchData(endpoint, queries, fetchOptions);
 const jsonResponse = await fetchResponse.json();
 return jsonResponse;
}
