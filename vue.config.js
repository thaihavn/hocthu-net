var PACKAGE = require('./package.json');
var path = PACKAGE.name + '/' + PACKAGE.version;
console.log(path);
module.exports = {
    assetsDir:path,
    configureWebpack: {
        plugins: [
        ]
    },
    "runtimeCompiler": true,
    devServer: {
        proxy: {
            '/api-ht': {
                target: 'http://118.68.218.27:8008',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api-ht': ''
                }
            },
        }

    }
};