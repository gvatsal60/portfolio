module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jsx-a11y", "import"],
  rules: {
    "no-unused-vars": "warn",
    "import/no-unresolved": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
