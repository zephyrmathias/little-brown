module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testPathIgnorePatterns: ['/node_modules/', '/coverage/'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
};
