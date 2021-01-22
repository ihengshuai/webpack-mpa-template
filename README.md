## 多页面项目骨架

文章介绍请移步: [博客](http://blog.usword.cn/views/note/2019/222014/)

### 执行
```shell script
yarn

yarn run dev

yarn run build

yarn run deploy

yarn run view
```

### 安装相关
1. 下载速度比较慢时，代理淘宝源
	- [npm]: npm config set registry https://registry.npm.taobao.org
	- [yarn]: yarn config set registry https://registry.npm.taobao.org

2. `node-sass`下载报错
	- [npm]: npm config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
	- [yarn]: yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g

>配置完后重新下载即可: `npm install` or `yarn`


### 技术栈
本项目使用webpack将传统页面和单页面混合开发，前台使用传统页面开发，后台管理系统使用单页面开发。
HTML可以使用pug语法代替，优先pug文件，没有的话就是HTML文件。项目默认嵌入Vue和React，开箱即用，可以根据需求，自由卸载或添加...

### 命名规范
webpack以`entry.js`为入口，`pages`下的文件名都是真实路径，pages下的路径可以无限嵌套，模拟真实的路径，htmlloader以`index.html或index.pug`为入口

### Server
Server目录是项目的mock服务，用来模拟各种数据，router文件夹下的index.js是路由的入口文件，它会遍历router文件夹夹得所有文件夹下的index.js文件，自动生成路由，mock已经挂在到koa的上下文中，不需要再单独的路由页面引入。

### 浏览器支持
- IE >= 9

### 版本要求
NodeJS: v12.18.0
