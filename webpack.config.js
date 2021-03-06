

var config = {
    context: __dirname + "/web",
   entry: './main.js',
	
   output: {
      path: __dirname + '/client',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
		presets: ['es2015', 'react']
            }
         },
	  { test: /\.css$/, loader: "style-loader!css-loader" },
	  {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
	  {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
	  {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
	  {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
	  { test: /bootstrap.+\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window' }      
]
   }
}

module.exports = config;
