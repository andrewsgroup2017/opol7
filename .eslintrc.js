// $ cat .eslintrc.js
module.exports = {
  plugins: ['vue'],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  globals: {},
  extends: ['plugin:vue/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
      'babel-plugin-root-import': {
        rootPathPrefix: '~',
        rootPathSuffix: 'src/api',
      },
    },
  },
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',

    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'acc', 'event'],
      },
    ],
    'function-paren-newline': 'off',
    'max-len': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'object-curly-newline': ['error', { consistent: true }],
    semi: ['warn', 'never'],
  },
}
