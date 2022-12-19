module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.eslint.json"
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        "ignoreIIFE": true
      }
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "no-case-declarations": "off"
  },
  "env": {
    "node": true
  }
}
