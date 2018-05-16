## React.js 教程

### 搭建开发环境

#### 安装 webpack

`npm i webpack webpack-cli --save-dev`



#### 目录结构

- /src
  - index.js
- /dist
  - index.html
- package.json
- webpack.config.js



#### 配置 webpack

*webpack.config.js* 

```javascript
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    }
};
```



#### 第一个程序

*src/index.js*

```js
var foo = document.createElement('div');
foo.innerHTML = 'bar';
document.body.appendChild(foo);
```



*dist/index.html*

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <script src="main.js"></script>
</body>
</html>
```



*package.json*

```js
"scripts": {
    "build": "webpack"
},
```



#### 运行

命令行输入: npm run build

在浏览器中打开`dist/index.html`



#### 自动化

##### 修改代码自动更新

`npm i webpack-dev-server --save-dev` 



*package.json*

```js
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --open --content-base dist --progress --mode development"
},
```

参数说明:

1. `--open` 启动后直接在浏览器中打开
2. `--content-base dist` 指定打开的目录
3. `--progress` 显示启动进度
4. `--mode development` 使用开发模式，修改后自动刷新页面，并且可以得到更快的加载速度







##### 自动将 js 文件引入 html 中

`npm i html-webpack-plugin  --save-dev`



*src/template/index.html*

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
</body>
</html>
```



*webpack.config.js*

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'title',
            template: path.resolve(__dirname, 'src/template/index.html'),
            hash: true,
        }),
    ]
};
```



配置好后，可以无需再指定 *package.json* 中的 --content-base dist 参数

参数说明:

`title` 生成的*.html 文件的title, 将会替换模板中的 `<%= htmlWebpackPlugin.options.title %>`

`template` 模板文件位置

`hash` 是否追加一个hash 值到文件路径末尾，可以用于解除缓存





#### 安装 React

`npm i react react-dom --save`

其中react是react的核心代码，react-dom提供了针对DOM的方法 



#### 使用ES6

`npm i babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev`



*webpack.config.js*

```js
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
                }
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
```



*src/template/index.html*

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
<div id="app"></div>
</body>
</html>
```



### loader

`webpack` 自身只理解 JavaScript 语法
loader 让 webpack 能够去处理那些非 JavaScript 文件

在 webpack 的配置中 loader 有两个属性：

test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
use 属性，表示进行转换时，应该使用哪个 loader。



#### 在react中书写样式的方式





#### css 文件分离





#### 使用组件库













