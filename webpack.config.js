const path = require('path')
const { DefinePlugin } = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    // watch: true,
    mode: 'development',
    // devtool: false, // 关闭开发内容的输出
    entry: './src/main.js', // 可以使用相对路径
    output: {
        path: path.resolve(__dirname, 'dist'), // - configuration.output.path: The provided value must be an absolute path!
        filename: 'js/app.js'
    },
    target: 'web',
    devServer: {
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                oneOf: [
                    // this matches `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    esModule: false, // 不转为ES Module
                                    modules: true,
                                    localIdentName: '[local]_[hash:base64:5]'
                                }
                            },
                            'postcss-loader'
                        ]
                    },
                    // this matches plain `<style>` or `<style scoped>`
                    {
                        use: [
                            'vue-style-loader',
                            'css-loader',
                            'postcss-loader'
                        ]
                    }
                ]
                // // use中配置的loader的执行是有顺序的，默认从右往左或者从下往上，反正就是从后往前依次处理
                // use: [
                //     'style-loader',
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             importLoaders: 1,
                //             esModule: false // 不转为ES Module
                //         }
                //     },
                //     'postcss-loader'
                // ] // 需要多个loader，而这些loader在处理时不需要传递额外的参数配置。
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            esModule: false // 不转为ES Module
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                // Type: 'asset/inline',
                type: 'asset',
                generator: {
                    filename: 'img/[name].[hash:8][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 5 * 1024 // 设置最大阈值
                    }
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name].[hash:8][ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'WebPack is the best frontend develope tool.',
            template: './public/index.html'
        }),
        new DefinePlugin({
            BASE_URL: '"./"' // 这里根据给的内容去定义常量，所以需要两层引号
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    // To: './dist', // 这里可以忽略简写，因为不给to,默认会存放到webpack配置的output的path指定的目录
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        new VueLoaderPlugin()
    ]
}
