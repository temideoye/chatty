const path = require('path');
const glob = require('glob');
const precss = require('precss');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

const BUNDLE_DIR = path.resolve(__dirname, 'dist');
const JS_FILES = /\.(jsx?|tsx?)$/;
const CSS_FILES = /\.css$/;
const HTML_FILES = /\.html$/;
const IMG_FILES = /\.(svg|gif|png|jpe?g)$/i;
const SOUND_FILES = /\.(m4a|mp3|ogg)$/i;
const FONT_FILES = /\.(ttf|eot|woff|woff2)$/;

module.exports = (env, argv) => {
	const devMode = argv.mode === 'development';
	const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;
	return {
		entry: { main: './src/index.tsx' },
		output: {
			path: BUNDLE_DIR,
			chunkFilename: 'js/[name].bundle.[chunkhash:4].js',
			filename: 'js/[name].bundle.[chunkhash:4].js'
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'initial'
					}
				}
			}
		},
		devServer: {
			historyApiFallback: true,
			overlay: true,
			open: true
		},
		resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'] },
		module: {
			rules: [
				{
					test: HTML_FILES,
					use: [{ loader: 'html-loader', options: { minimize: true } }]
				},
				{
					test: JS_FILES,
					exclude: /node_modules/,
					use: { loader: 'babel-loader' }
				},
				{
					test: CSS_FILES,
					use: [
						styleLoader,
						{
							loader: 'css-loader',
							options: { importLoaders: 1 }
						},
						{
							loader: 'postcss-loader',
							options: { plugins: [autoprefixer, postcssPresetEnv, precss] }
						}
					]
				},
				{
					test: IMG_FILES,
					use: {
						loader: 'file-loader',
						options: { name: 'img/[name].[hash:4].[ext]' }
					}
				},
				{
					test: SOUND_FILES,
					use: {
						loader: 'file-loader',
						options: { name: 'sounds/[name].[hash:4].[ext]' }
					}
				},
				{
					test: FONT_FILES,
					use: {
						loader: 'file-loader',
						options: { name: 'fonts/[name].[ext]' }
					}
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({ template: './index.html', filename: './index.html' }),
			new CopyPlugin([{ from: './src/favicons/', to: './' }]),
			new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:4].css' }),
			new PurifyCSSPlugin({
				paths: glob.sync(path.join(__dirname, 'src/**/*.js'), { nodir: true }),
				purifyOptions: { minify: true, info: true, rejected: false, whitelist: [] }
			})
		]
	};
};
