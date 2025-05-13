module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@api": "./src/api",
            "@components": "./src/components",
            "@components/*": "./src/components/*",
            "@screens": "./src/screens",
            "@assets": "./src/assets",
            "@hooks": "./src/hooks",
            "@utils": "./src/utils/index",
            "@constants": "./src/constants",
            "@type": "./src/types",
            "@contexts": "./src/contexts",
            "@services": "./src/api/services",
            "@store": "./src/store",
          },
        },
      ],
    ],
  };
};