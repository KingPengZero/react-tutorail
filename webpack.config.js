const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'],
                },

            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'title',
            template: path.resolve(__dirname, 'src/template/index.html'),
            hash: true,
        }),
    ]
};