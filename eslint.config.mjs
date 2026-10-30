import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js, "@stylistic": stylistic },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.node },
        rules: {
            "no-unused-vars": ["warn"],
            "no-undef": ["error"],
            "no-empty": ["error"],
            "no-duplicate-imports": ["error"],
            "no-shadow": ["warn"],
            eqeqeq: ["error", "always"],
            "default-case": ["warn"],

            "no-var": ["error"],
            "prefer-const": ["error"],
            "prefer-template": ["warn"],
            "arrow-body-style": ["warn", "as-needed"],
            curly: ["error", "all"],

            semi: ["error", "always"],
            quotes: ["error", "double"],
            indent: ["error", 2],
            "comma-dangle": ["error", "always-multiline"],
            camelcase: ["warn"],
            "no-trailing-spaces": ["error"],
            "no-multiple-empty-lines": ["error", { max: 1 }],
            "eol-last": ["error", "always"],
        },
    },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
