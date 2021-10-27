// const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://nunu.gg:8443",
                changeOrigin: true,
            },

        }
    }
}