module.exports = {
  'transform': {
    '.(js|ts|tsx)': 'ts-jest'
  },
  'testEnvironment': 'jsdom',
  'testTimeout': 30 * 1000,
  'collectCoverageFrom': [
    'src/**/*',
    '!**/node_modules/**'
  ],
  'coveragePathIgnorePatterns': [
    'node_modules/',
    'src/test'
  ],
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/deno/',
    '/dist/'
  ],
  'modulePathIgnorePatterns': [
    '<rootDir>/dist'
  ]
};
