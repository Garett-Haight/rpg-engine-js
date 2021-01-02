module.exports = function(env) {
    console.log(env);
    if (env.prod) {
        require(`./webpack.prod.js`);
    } else {
        return require(`./webpack.dev.js`)
    }
}