module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "semi": [2, "always"],
    "vue/require-default-prop": ["off"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
