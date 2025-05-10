module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "ts-standard",
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
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["n"],
  rules: { "n/prefer-node-protocol": "error"},
};
