const webpack = require("webpack")
const dist = require("./dist")

dist.output.filename = "isodom.min.js"
dist.plugins = [
    new webpack.optimize.UglifyJsPlugin()
]

module.exports = dist
