var path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.jsx",
    output: {
        path: path.resolve("build"),
        filename: "index.jsx",
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env", "@babel/preset-react"] },
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
        ],
    },
    externals: {
        react: "react",
    },
};
