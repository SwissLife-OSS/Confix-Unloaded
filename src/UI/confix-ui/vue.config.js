const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['json', 'graphql'],
        features: ['!gotoSymbol'],
      },

    ])
  },
  configureWebpack: {
    devtool: 'source-map'
  },
}