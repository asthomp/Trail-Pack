module.exports = {
  extends: ["universe/native"],
  root: true,
  rules: {
    "sort-keys": [
      "error",
      "asc",
      { caseSensitive: true, minKeys: 2, natural: false },
    ],
    "sort-vars": "error",
  },
};
