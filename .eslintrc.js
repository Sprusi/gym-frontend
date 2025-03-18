module.exports = {
  settings: {
    react: {
      version: '999.999.999',
    },
  },
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  // Плагин only-error - делает любые замечания линтера ошибками
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'i18next', 'i18n', 'only-error', 'prettier'],
  rules: {
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'i18n/no-russian-character': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true,
        endOfLine: 'auto',
      },
    ],
  },
};
