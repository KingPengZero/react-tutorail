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

其中 `react` 是react的核心代码，`react-dom `提供了针对DOM的方法 





#### 使用ES6, JSX

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
`test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
`use` 属性，表示进行转换时，应该使用哪个 loader。



#### 在react中书写样式的方式

a. 使用行内样式 ( 不推荐 )



b. 引入`.css` 文件





#### 解析css

`npm i css-loader style-loader --save-dev `



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
                },

            }
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },]
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



*src/index.js*

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class App extends React.Component {
    render() {
        return (
            <div>
                hello react
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));
```



*src/style.css*

```css
div {
    background: skyblue;
}
```



#### 使用 less 或者 sass

`npm install less-loader` 或者 `npm install sass-loader`. 



#### css 文件分离

##### webpack 3

`npm i extract-text-webpack-plugin --save-dev`

```
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
```



##### webpack 4

???



#### 处理图片

`npm install file-loader url-loader --save-dev`



*webpack.config.js*

```js
{
    test: /\.(png|jpg)$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 2048,
        },
    }
}
```





#### 使用组件库 

`npm i antd --save`



##### 按需加载

`npm i babel-plugin-import --save`



*webpack.config.js*

```
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['react', 'es2015'],
            plugins: [
                ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css"}] // `style: true` 会加载 less 文件
            ]
        },
    }
}
```



#### 打包前清理

`npm i clean-webpack-plugin --save`



*webpack.config.js*

```js
plugins: [
    new CleanPlugin(path.resolve(__dirname, 'dist'))
],
```





使用hash





合并 webpack.config





多入口模式





分离第三方应用

*webpack.config.js*

```js
optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /node_modules/,
                name: "vendor",
                chunks: "all"
            }
        }
    }
}
```





### React

[文档](https://doc.react-china.org/)





###  生命周期

**componentWillMount**
在完成首次渲染之前调用，此时仍可以修改组件的state。

**render**
必选的方法，创建虚拟DOM，该方法具有特殊的规则：
* 只能通过this.props和this.state访问数据
* 可以返回null、false或任何React组件
* V15中只能出现一个顶级组件, V16可以返回数组



**componentDidMount**
真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。
在服务端中，该方法不会被调用。



**componentWillReceiveProps**
组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。

```Js
componentWillReceiveProps: function(nextProps) {
    if (nextProps.bool) {
        this.setState({
            bool: true
        });
    }
}
```



**shouldComponentUpdate**
组件是否应当渲染新的props或state，返回false表示跳过后续的生命周期方法，通常不需要使用以避免出现bug。在出现应用的瓶颈时，可通过该方法进行适当的优化。
在首次渲染期间或者调用了forceUpdate方法后，该方法不会被调用

**componentWillUpdate**
接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state。

**componentDidUpdate**
完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。

**componentWillUnmount**

组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。



