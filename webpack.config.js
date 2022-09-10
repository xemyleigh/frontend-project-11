import HtmlWebpackPlugin from 'html-webpack-plugin';


export default {
  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      template: './src/template.html',
    }),
  ],

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

};
