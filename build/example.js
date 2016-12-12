const dist = require("./dist")
const HtmlPlugin = require("html-webpack-plugin")
const path = require("path")
const webpack = require("webpack")

dist.entry = path.join(__dirname, "../src/example/main")

dist.output = {
    path: path.join(__dirname, "../example"),
}

dist.output.filename = "example.js"

dist.module.loaders.push({
    test: /\.(png|jpg|gif|svg)$/,
    loader: "url",
    options: {
        limit: 10000,
    }
})

dist.plugins = [new HtmlPlugin({
    template: path.join(__dirname, "index.html"),
    filename: "index.html",
    inject: "body",
})]

dist.devtool = false

module.exports = dist
