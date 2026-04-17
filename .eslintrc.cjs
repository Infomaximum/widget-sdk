module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },
  rules: {
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "zod",
            allowTypeImports: true,
            message: "Импортируй только типы из zod: используй `import type`.",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.test.ts"],
      rules: {
        "@typescript-eslint/no-restricted-imports": "off",
      },
    },
  ],
};
