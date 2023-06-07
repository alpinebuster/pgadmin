module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'amd': true,
    'jasmine': true,
  },
  'extends': [
    'eslint:recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 2018,
    "sourceType": "module",
  },
  'globals': {
    '_': true,
    'module': true,
    'process': true,
    'nw': true,
    'platform': true
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': 0,
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'comma-dangle': [
      'error',
      'always-multiline'
    ],
    'no-console': ["error", { allow: ["warn", "error"] }],
    // We need to exclude below for RegEx case
    "no-useless-escape": 0,
  },
};
