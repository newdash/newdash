module.exports = {
  'transform': {
    '.(js|ts|tsx)': 'ts-jest'
  },
  'testTimeout': 30000,
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
  ]
};
