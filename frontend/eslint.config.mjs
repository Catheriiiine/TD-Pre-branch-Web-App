// Merge with any existing frontend ESLint flat config rather than dropping
// project-specific Next.js, React, or accessibility rules.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsdoc from "eslint-plugin-jsdoc";

const codeRules = {
  // TypeScript-aware rules replace their ESLint core counterparts.
  "no-unused-vars": "off",
  "no-magic-numbers": "off",
  "@typescript-eslint/no-unused-vars": [
    "error",
    { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
  ],
  "@typescript-eslint/no-magic-numbers": [
    "error",
    {
      ignore: [-1, 0, 1, 2],
      ignoreArrayIndexes: true,
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreDefaultValues: true,
    },
  ],
  "jsdoc/require-jsdoc": [
    "error",
    {
      enableFixer: false, // Missing descriptions must be written by people.
      require: {
        FunctionDeclaration: true,
        FunctionExpression: true,
        ArrowFunctionExpression: true,
        MethodDefinition: true,
      },
    },
  ],
  "jsdoc/require-description": "error",
};

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    plugins: { jsdoc },
    rules: {
      ...codeRules,
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "function", format: ["camelCase"] },
        { selector: "classMethod", format: ["camelCase"] },
        { selector: "objectLiteralMethod", format: ["camelCase"] },
        { selector: "variable", format: ["camelCase", "UPPER_CASE"] },
      ],
    },
  },
  {
    files: ["**/*.{tsx,jsx}"],
    rules: {
      // PascalCase is required by React for named function components.
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "function", format: ["camelCase", "PascalCase"] },
        { selector: "classMethod", format: ["camelCase"] },
        { selector: "objectLiteralMethod", format: ["camelCase"] },
        { selector: "variable", format: ["camelCase", "PascalCase", "UPPER_CASE"] },
      ],
    },
  },
  {
    // JavaScript/JSX files use ESLint's native rules; TypeScript code uses
    // the more precise typescript-eslint rules above.
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: { jsdoc },
    rules: {
      "no-unused-vars": "error",
      "no-magic-numbers": ["error", { ignore: [-1, 0, 1, 2], ignoreArrayIndexes: true }],
      "camelcase": "error",
      "jsdoc/require-jsdoc": codeRules["jsdoc/require-jsdoc"],
      "jsdoc/require-description": "error",
    },
  },
  {
    // Keep this after all language rules so JavaScript tests stay exempt too.
    files: [
      "**/*.{test,spec}.{js,jsx,mjs,cjs,ts,tsx,mts,cts}",
      "**/__tests__/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}",
    ],
    rules: {
      "jsdoc/require-jsdoc": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/types/api.generated.ts",
    "playwright-report/**",
    "test-results/**",
    ".playwright-browsers/**",
  ]),
]);
