module.exports = {
  collectCoverageFrom: ['lib/*.js'],
  coverageDirectory: './.coverage/',
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      line: 75,
      statements: 75,
    },
  },
  testEnvironment: 'node',
  roots: ['lib'],
  testRegex: '.*\\.test\\.js$|lib/__tests__/.*\\.js$',
};
