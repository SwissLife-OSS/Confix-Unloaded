// eslint-disable-next-line @typescript-eslint/no-var-requires
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    apollo: {
      lintGQL: false,
    },
  },
  chainWebpack: (config) => {
    config.plugin("monaco-editor").use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ["json", "graphql"],
      },
    ]);
  },
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    proxy: {
      "/graphql": {
        ws: true,
        changeOrigin: true,
        target: "http://localhost:5000/graphql",
      },
    },
  },
};
