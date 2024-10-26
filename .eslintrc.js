module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-unreachable': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
  env: {
    'jest/globals': true,
  },
};
