const path = require('path');
const webpack = require('webpack');

module.exports = {
    devServer: {
      contentBase: '.'+path.sep,
        port: 8080
    },
    context: path.resolve(__dirname, '.'+path.sep+'public'+path.sep+'javascripts'+path.sep+'rpg'),
    entry: {
        app: '.'+path.sep+'Main.js',
    },
    output: {
        path: path.resolve(__dirname, '.'+path.sep+'public'+path.sep+'javascripts'+path.sep+'dist'),
        filename: 'rpg.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ],
    },
};