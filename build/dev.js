const dist = require("./dist")
const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")

dist.entry = {
    lib: dist.entry,
    dev: path.join(__dirname, "../src/example/main"),
}

dist.output.filename = "[name].js"

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

dist.devServer = {
    host: "0.0.0.0",
    port: 3000,
}

module.exports = dist
