const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            // rule dla kompilacji plików css
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

            // rule dla kompilacji plików sass/scss
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
    }
};