// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
import { fileURLToPath } from 'url';
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: 'body',
            template: './src/template.html'
        })
    ]
}