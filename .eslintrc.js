module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser', //vue解析器
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.app.json',
      './tsconfig.config.json',
      './tsconfig.vitest.json'
    ],
    parser: '@typescript-eslint/parser', //ts解析
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  }
}
