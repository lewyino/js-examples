const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/es6/40_modules/app.js',
    output: {
        path: path.resolve(__dirname, 'dist/examples/es6/40_modules'),
        filename: 'app.js',
    },
    plugins: [new HtmlWebpackPlugin({ template: './examples/es6/40_modules/modules.html' })],
};
