var path = require('path');
var webpack = require('webpack');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        port: process.env.PORT || 8601
    },
    devtool: 'cheap-module-source-map',
    entry: {
        lib: ['react', 'react-dom'],
        gui: './src/index.js',
        blocksonly: './src/examples/blocks-only.js',
        compatibilitytesting: './src/examples/compatibility-testing.js',
        player: './src/examples/player.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    externals: {
        React: 'react',
        ReactDOM: 'react-dom'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src')
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    camelCase: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: function () {
                        return [
                            postcssImport,
                            postcssVars,
                            autoprefixer({
                                browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']
                            })
                        ];
                    }
                }
            }]
        },
        {
            test: /\.(svg|png|wav)$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
            'process.env.DEBUG': Boolean(process.env.DEBUG)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            filename: 'lib.min.js'
        }),
        new HtmlWebpackPlugin({
            chunks: ['lib', 'gui'],
            template: 'src/index.html',
            title: 'Scratch 3.0 GUI'
        }),
        new HtmlWebpackPlugin({
            chunks: ['lib', 'blocksonly'],
            template: 'src/index.html',
            filename: 'blocks-only.html',
            title: 'Scratch 3.0 GUI: Blocks Only Example'
        }),
        new HtmlWebpackPlugin({
            chunks: ['lib', 'compatibilitytesting'],
            template: 'src/index.html',
            filename: 'compatibility-testing.html',
            title: 'Scratch 3.0 GUI: Compatibility Testing'
        }),
        new HtmlWebpackPlugin({
            chunks: ['lib', 'player'],
            template: 'src/index.html',
            filename: 'player.html',
            title: 'Scratch 3.0 GUI: Player Example'
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: 'static'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-blocks/media',
            to: 'static/blocks-media'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-vm/dist/node/assets',
            to: 'static/extension-assets'
        }]),
        new CopyWebpackPlugin([{
            from: 'extensions/**',
            to: 'static',
            context: 'src/examples'
        }]),
        new CopyWebpackPlugin([{
            from: 'extension-worker.{js,js.map}',
            context: 'node_modules/scratch-vm/dist/web'
        }])
    ].concat(process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ] : [])
};
