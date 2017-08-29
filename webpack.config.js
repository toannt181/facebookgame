const path = require('path');
module.exports = {
    entry: ['./src/client/index.js'],
    output: {
        path: path.resolve(__dirname, './static/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.s?css$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};

