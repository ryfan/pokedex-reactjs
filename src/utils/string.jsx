export function capitalize(str) {
 const lower = str.toLowerCase();
 return str.charAt(0).toUpperCase() + lower.slice(1);
}

export function lowercase(str) {
 let lower = str.toString().toLowerCase();
 return lower;
}
