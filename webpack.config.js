var path = require('path');

var config = {
    // TODO: Add common Configuration
    module: {},
};


var appBundle = Object.assign({}, config,{
    // Change to your "entry-point".
    mode:'development',
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
});

module.exports = [
    appBundle      
];