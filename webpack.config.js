module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
 
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {                                                                           //Added to load css files
            test: /\.css$/,
            loader: "style-loader!css-loader"
      },
		{
			test: /\.txt$/,
			loader: "raw-loader"
		}
		
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx','.css','.txt']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};

