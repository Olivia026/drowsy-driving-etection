module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://xxxxx.com:9093',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            "viewportWidth": 1920,
            "unitPrecision": 5,
            "minPixelValue": 1,
            "exclude": [/components\/demo/]
          })
        ]
      }
    }
  }
}