module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-element-dropdown|@gorhom/bottom-sheet)/)", // Add @gorhom/bottom-sheet
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js",
  },
  transform: {
    "^.+.(js|ts|tsx)$": "babel-jest",
  },
  setupFiles: ['./jest.setup.js'],
  testEnvironment: "jsdom", // Add this line
};
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|expo-modules-core|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-element-dropdown|@gorhom/bottom-sheet)/)'
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@assets/(.*)$": "<rootDir>/__mocks__/@assets/$1", // Ensure this mock path is correct
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js",
  },
  transform: {
    "^.+.(js|ts|tsx)$": "babel-jest",
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: "jsdom",
};
