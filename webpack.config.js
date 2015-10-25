var webpack = require('webpack');
var path = require('path');
module.exports ={
    entry: path.resolve(__dirname,'src/entry.jsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel'
            },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.json$/,loader: 'json-loader'},
            {
              test: require.resolve("jquery"),
              loader: "imports?$=jquery"
            }
        ]
    },
    resolve:{
        // you can now require('file') instead of require('file.json')
        extensions: ['', '.js','.json','.coffee']
    }

}
