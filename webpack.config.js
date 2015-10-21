var webpack = require('webpack');
var path = require('path');
module.exports ={
    entry: path.resolve(__dirname,'src/entry.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"}
        ]
    },
    resolve:{
        // you can now require('file') instead of require('file.json')
        extensions: ['', '.js','.json','.coffee']
    }

}
