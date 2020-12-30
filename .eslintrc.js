// .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error"
  }
}