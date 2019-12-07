module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(preact-material-components/*|@material/*)/)"
  ],
  testPathIgnorePatterns: ['/node_modules/', 'cypress/*'],
  setupFilesAfterEnv: ['<rootDir>/testSetupFile.js'],
  projects: ['<rootDir>/rtcjs/message-controller/*'],
};
