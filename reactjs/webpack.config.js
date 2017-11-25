let path = require('path');
//let webpack = require('webpack');

module.exports = {
    entry: {
        'bundle': './client/',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/',
        libraryTarget: 'umd',
        /** The library name on window */
        library: '[name]'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'client')
            }
        ]
    }
};
