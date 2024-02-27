module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ["expo-router/babel", "react-native-reanimated/plugin"],
    presets: ["babel-preset-expo"],
  };
};
