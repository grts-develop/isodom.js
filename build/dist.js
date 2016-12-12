const path = require("path")

module.exports = {
    entry: path.join(__dirname, "../src/main.js"),
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
