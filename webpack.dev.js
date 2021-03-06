const path = require('path');
const webpack = require('webpack');
console.log("DEV");

module.exports = {
    context: path.resolve(__dirname, '.'+path.sep+'public'+path.sep+'javascripts'+path.sep+'rpg'),
    entry: {
        app: '.'+path.sep+'Main.js',
    },
    devtool: 'cheap-eval-source-map',
    output: {
        path: path.resolve(__dirname, '.'+path.sep+'public'+path.sep+'javascripts'+path.sep+'dist'),
        filename: 'rpg.bundle.js',
    }
};