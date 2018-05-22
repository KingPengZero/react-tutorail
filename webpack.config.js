const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require("clean-webpack-plugin");


module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: [
                        ["import", {
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css"
                        }] // `style: true` 会加载 less 文件
                    ]
                },
            }
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(png|jpg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 2048,
                },
            }
        }]
    },
    plugins: [
        new CleanPlugin(path.resolve(__dirname, 'dist')),
        new HtmlWebpackPlugin({
            title: 'title',
            template: path.resolve(__dirname, 'src/template/index.html'),
            hash: true,
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /react/,
                    name: "react",
                    chunks: "all"
                },
                reactDOM: {
                    test: /react-dom/,
                    name: "reactDOM",
                    chunks: "all"
                },
                antd: {
                    test: /antd/,
                    name: "antd",
                    chunks: "all"
                },
            }
        }
    }
};