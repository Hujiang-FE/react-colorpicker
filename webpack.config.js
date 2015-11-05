
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

var conditionalCompile = new webpack.DefinePlugin({
    __DEBUG__ : false
})

module.exports = {
    entry: {
        'react-colorpicker': "./src/index.js"
    }
    , output: {
        path: __dirname + "/dist",
        filename: '[name].js',
        library: 'ColorPicker',
        libraryTarget: 'umd'
    }
    , module: {
        loaders: [            
            {
                test: /\.js$/,
                loader: "babel",
                query:{
                    //blacklist:["strict"]
                }
            }
            ,{ test: /\.css$/, loader: "style!css" }
            // ,{
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract("style-loader","css-loader")
            // }
        ]
    }
    // , plugins: [
    //     new ExtractTextPlugin("[name]" + ".css"),
    //     conditionalCompile
    // ]
};