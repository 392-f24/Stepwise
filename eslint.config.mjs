// yarn add -D eslint prettier @babel/eslint-parser @babel/plugin-syntax-jsx eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-react
import babelParser from '@babel/eslint-parser'
import prettier from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'

export default [
  {
    ignores: ['node_modules/', 'build/', '.yarn/', '.pnp.*', '.cache/'],
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: 'readonly',
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        project: './jsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          plugins: ['@babel/plugin-syntax-jsx'],
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'max-len': [
        'error',
        {
          code: 80,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettier,
]
