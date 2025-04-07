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
            "@components": "./components",
            "@screens": "./screens",
            "@assets": "./assets",
            "@hooks": "./hooks",
            "@utils": "./utils",
            "@constants": "./constants",
            "@types": "./types",
            "@contexts": "./contexts",
            "@services": "./services"
          },
        },
      ],
    ],
  };
};