/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': 'esbuild-jest',
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.scss$': 'identity-obj-proxy',
  },
};
