const { defaults } = require('react-scripts/jest/config');

module.exports = {
  ...defaults,
  verbose: true,
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  globals: {
    'process.env': {
      NODE_ENV: 'test',
    },
  },
  bail: true,
  automock: false,
};
