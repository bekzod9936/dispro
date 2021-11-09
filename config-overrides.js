const webpack = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  webpack: function (config, _) {
    for (let i = 0; i < config.plugins.length; i++) {
      const current = config.plugins[i];
      if (current instanceof webpack.DefinePlugin) {
        config.plugins[i] = new webpack.DefinePlugin({
          ...current,
          "proccess.env.REACT_APP_URL": JSON.stringify(
            process.env.REACT_APP_URL
          ),
          "proccess.env.REACT_APP_STORAGE_URL": JSON.stringify(
            process.env.REACT_APP_STORAGE_URL
          ),
          "proccess.env.REACT_APP_WEBSITE_URL": JSON.stringify(
            process.env.REACT_APP_WEBSITE_URL
          ),
          "proccess.env.REACT_APP_WEBSOCKET_URL": JSON.stringify(
            process.env.REACT_APP_WEBSOCKET_URL
          ),
          "proccess.env.REACT_APP_PUBLIC_URL": JSON.stringify(
            process.env.REACT_APP_PUBLIC_URL
          ),
        });
      }
    }
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [...config.resolve.plugins, new TsconfigPathsPlugin()],
      },
      plugins: [...config.plugins],
    };
  },
};

// config.plugins.push(new CopyWebpackPlugin([]), new CleanWebpackPlugin());
// return config;
