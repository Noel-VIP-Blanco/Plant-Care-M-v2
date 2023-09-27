module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@root": "./",
            "@components": "./app/components",
            "@screens": "./app/screens",
            "@interface": "./app/interface",
            "@stylesheets": "./app/stylesheets",
          },
        },
      ],
    ],
  };
};
