module.exports = {
  "preset": "react-native",
  "setupFiles": ["./jest.setup.js"],
  "transformIgnorePatterns": ["node_modules/(?!(@react-native-community/async-storage/lib))"],
  "moduleFileExtensions": ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
