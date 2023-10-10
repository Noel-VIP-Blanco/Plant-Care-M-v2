module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "@components": "./app/components",
            "@screens": "./app/screens",
            "@interface": "./app/interface",
            "@stylesheets": "./app/stylesheets",
            "@reduxToolkit": "./app/redux",
            "@backend": "./app/backend",
            "@root": "./",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
