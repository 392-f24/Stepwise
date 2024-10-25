// yarn add -D eslint prettier @babel/eslint-parser @babel/plugin-syntax-jsx eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-react
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser';

export default [
  {
    ignores: ["node_modules/", "build/", ".yarn/", ".pnp.cjs"],
  },
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        React: "readonly",
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          plugins: ["@babel/plugin-syntax-jsx"],
        },
      },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "max-len": [
        "error",
        {
          "code": 100,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true,
          "ignoreRegExpLiterals": true
        }
      ]
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
