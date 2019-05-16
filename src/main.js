require("babel-runtime/regenerator")//babel-runtime必须放第一位
require("webpack-hot-middleware/client?reload=true")//发送给client来设置web socket连接，要使用hotmiddleware必须为入口文件添加一个~/client
require("./main.css")
require("./index.html")
