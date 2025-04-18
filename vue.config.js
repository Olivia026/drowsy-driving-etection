module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://xxxxx.com:9093",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/drowsy-driving-etection/" // 替换为仓库名
      : "/",
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            viewportWidth: 1920,
            unitPrecision: 5,
            minPixelValue: 1,
            exclude: [/components\/demo/],
          }),
        ],
      },
    },
  },
};
