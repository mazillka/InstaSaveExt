const devMode = process.env.NODE_ENV !== "production";
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ZipBundlerPlugin = require("webpack-zip-bundler");

module.exports = {
    entry: {
        options: "./src/options.js",
        contentscript: './src/js/contentscript.js',
        background: './src/js/background.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/'),
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ["default", {
                        discardComments: {
                            removeAll: true
                        }
                    }]
                }
            })
        ],
    },
    module: {
        rules: [
            // html
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: !devMode,
                        interpolate: true,
                        root: path.resolve(__dirname, "src"),
                        attrs: [":data-src"]
                    }
                }]
            },

            // sass, css
            {
                test: /\.(scss)|(css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: () => {
                            return [
                                require("precss"),
                                require("autoprefixer")
                            ];
                        }
                    }
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin([
            { from: "./src/icons", to: "icons" },
            { from: "./src/manifest.json", to: "manifest.json" }
        ]),

        new HtmlWebPackPlugin({
            template: "./src/options.html",
            filename: "./options.html",
            excludeChunks: ["background", "contentscript"]
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        
        new ZipBundlerPlugin()
    ]
};
