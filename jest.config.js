module.exports = {
    verbose: true,
    testPathIgnorePatterns:["/node_modules/","cypress/*"],
    setupFilesAfterEnv: ["<rootDir>/testSetupFile.js"],
    projects:["<rootDir>/rtcjs/message-controller/*"]
  };