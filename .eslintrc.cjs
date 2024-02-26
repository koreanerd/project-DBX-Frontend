module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "no-inline-comments": "error",
    "spaced-comment": ["error", "never"],
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
