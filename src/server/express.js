import express from "express"
import path from "path"

const server = express()

const webpack = require("webpack")
const config = require("../../config/webpack.dev.js")
const compiler = webpack(config)//webpack此时就是我们的编译器，此代码实例化编译器

const webpackDevMiddleware = 
require("webpack-dev-middleware")(
    compiler,
    config.devServer
)//webpack-dev-middleware输出的文件存在于内存中。
//你定义了 webpack.config，webpack 就能据此梳理出entry和output模块的关系脉络，
//而 webpack-dev-middleware 就在此基础上形成一个文件映射系统，
//每当应用程序请求一个文件，它匹配到了就把内存中缓存的对应结果以文件的格式返回给你，反之则进入到下一个中间件。

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler)

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware) //注意三个middleware的顺序不能错，共同实现热加载

const staticMiddleware = express.static("dist")

server.use(staticMiddleware)//设置访问静态文件的路径

server.listen(8080, () => {
    console.log("Server is listening")
})