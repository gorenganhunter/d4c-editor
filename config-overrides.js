const { InjectManifest } = require("workbox-webpack-plugin");
const path = require("path");
module.exports = {
  webpack: function (config, env) {
    config.plugins.push(
      new InjectManifest({
        globPatterns: [
          "assets/mapping/*"
        ],
        globDirectory: "build",
        swSrc: path.join("src", "sw.js"),
        swDest: "service-worker.js",
      }),
    );
    return config;
  },
};
