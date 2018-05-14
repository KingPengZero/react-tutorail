## React.js 教程

### 搭建开发环境

#### 安装 webpack

`npm i webpack webpack-cli --save-dev`



#### 目录结构

* /src
  * index.js
* /dist
  * index.html
* package.json
* webpack.config.js



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
    "start": "webpack-dev-server --open --content-base dist --progress --hot --mode development"
},
```

参数说明:

1. `--open` 启动后直接在浏览器中打开
2. `--content-base dist` 指定打开的目录
3. `--progress` 显示启动进度
4. `--hot` 修改后自动刷新页面
5. `--mode development` 使用开发模式，可以得到更快的加载速度







##### 自动将 js 文件引入 html 中









`npm i react react-dom --save`









