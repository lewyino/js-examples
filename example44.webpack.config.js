const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/es6/44_modules/app.js',
    output: {
        path: path.resolve(__dirname, 'dist/examples/es6/44_modules'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './examples/es6/40_modules/modules.html',
            filename: "module.html"
        })
    ],
};
