module.exports = {

    testPathIgnorePatterns:["/node_modules/","cypress/*"],
    setupFilesAfterEnv: ["<rootDir>/testSetupFile.js"],
    projects:["<rootDir>/rtcjs/message-controller/*"],
  };