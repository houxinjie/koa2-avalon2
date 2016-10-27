var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        main: [
            "babel-polyfill",
            "./app/index.js"
        ],
    },
    output: {
        path: __dirname+'/public',
        filename: "[name].bundle.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "html" },
            { test: /\.(jpe?g|png|gif)$/i, loader:"file" },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ["transform-object-assign", "array-includes"],
                }
            },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
        ]
    },
    resolve: {
        modulesDirectories: [
            'node_modules'
        ],
        alias: {
            env: path.join(__dirname, 'app', 'env', process.env.NODE_ENV || 'development'),
        },
    }
}
