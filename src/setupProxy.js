const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api3', {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api3": ""
        }}),
        createProxyMiddleware('/api2', {
            target: 'https://api.map.baidu.com',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                "^/api2": ""
            }}),
    )
}