module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["./"],
      "alias": {
        "@services": "./src/services",
        "@components": "./src/components",
        "@store": "./src/store",
        "@pages": "./src/pages",
        "services": "./src/services",
        "components": "./src/components",
        "store": "./src/store",
        "pages": "./src/pages",
        "assets": "./src/assets",
      }
    }]
  ]
};
