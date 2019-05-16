const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        main:["./src/main.js"]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",//bracketed name is name in entry object
        path: path.resolve(__dirname,
        "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist", //everything will be served out of dist when run webpack dev server.
        overlay: true, //安装nodemon后修改server和本文件时不用重新npm run dev,会自动restart
        hot: true,
        stats: {
            colors: true
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader" //会先执行css-loader,再pass to style loader(内联样式)
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    // { //与html-webpack-plugin作用一致故可去除
                    //     loader: "file-loader",
                    //     options: {
                    //         name: "[name].html" //如何命名输出文件,name 为html原本名字
                    //     }
                    // },
                    // {
                    //     loader: "extract-loader" //告诉webpack希望这个文件是一个单独文件，不打包到main.bundle.js中
                    // },
                    {
                        loader: "html-loader",//注意use中的loader都是从下到上执行，先执行html-loader再extract告诉webpack这是单独文件，最后给输出文件命名。
                        options: {
                            attrs:["img:src"]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template:"./src/index.html"
        })
    ]
}