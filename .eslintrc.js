// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next',
  ],
  plugins: ['simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-shadow': 'off',
    curly: ['error', 'all'],
    '@next/next/no-html-link-for-pages': [
      2,
      path.join(__dirname, 'packages', 'app'),
    ],
    '@next/next/no-page-custom-font': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/no-anonymous-default-export': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^@?\\w.*\\u0000$', '^@?\\w'],
          // Internal packages.
          ['^(@exhibition)(/.*|$)'],
          // Internal packages.
          [
            '^(@commands|@config|@components|@database|@hocs|@jobs|@modules|@schemas|@services)(/.*|$)',
          ],
          // Parent imports. Put `..` last.
          [
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          // Other relative imports. Put same-folder imports and `.` last.
          [],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
