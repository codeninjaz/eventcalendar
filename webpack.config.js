var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8090',
            'webpack/hot/dev-server',
            './src/app.js'
        ],
    },
    devtool: 'source-map',
    //Lägg saker default i dist mappen, döp rot js till app.js och se till att sökvägar i genererad kod läggs under ./
    output: {
        path: path.resolve('./dist'),
        library: '[name]',
        filename: '[name].js',
    },
    externals:{
        react: 'React',
        jquery: 'jQuery',
        lodash: '_',
        moment: 'moment'
    },
    //Här ställer man in vilka filtyper webpack ska göra något med. Loaders installeras via npm
    //och används här. T.ex. bildfiler som inkluderas i js filerna med import lägger webpack i images
    //katalogen. Sass filer compileras till css och läggs in inline.
    module: {
        loaders: [{
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader']
        }, {
            test: /\.(scss|sass)$/,
            loader: 'style!css!sass'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?name=/Assets/calendar/images/[name].[ext]',
                'image?optimizationLevel=7&interlaced=false']
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&minetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        }]
    },
    //Gör att man inte behöver använda filändelserna js eller jsx vid import
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        fs: 'empty'
    },
    //Ladda plugins till webpack
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/vertx/),
        new HtmlWebpackPlugin({
            title: 'Calendar test',
            template: 'src/index.html',
            assets: {
                'app': 'app.js',
            }
        })
    ]
};
