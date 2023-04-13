const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
 fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

module.exports = {
 extends: ["react-app", "plugin:prettier/recommended"],
 plugins: ["prettier"],
 rules: {
  "prettier/prettier": ["error", prettierOptions]
 },
 overrides: [
  {
   files: ["**/*.js?(x)"],
   rules: { "prettier/prettier": ["error", prettierOptions] }
  }
 ]
};
