const path = require("path")
const process = require("process")
const webpack = require("webpack")

const dist = {
    entry: path.join(__dirname, "../src/lib/main.js"),
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "isodom.js",
        library: ["isodom"],
        libraryTarget: "umd",
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"],
            }
        ]
    },
    devtool: "source-map"
}

if (process.env.NODE_ENV === "minify") {
    dist.output.filename = "isodom.min.js"
    dist.plugins = [new webpack.optimize.UglifyJsPlugin()]
}

module.exports = dist
