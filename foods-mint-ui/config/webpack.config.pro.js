const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const extractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	mode:"production",
	entry:{
	   'scripts/app':"./src/app.js",
	   "vendor/vue":'vue'
	},
	output:{
		path:path.resolve(__dirname,"../dist"),
		filename:"[name]@[hash].js"
	},
	 resolve: {
	    alias: {
	      'vue': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
	    }
	},
	module:{
		rules:[
			{
				test:/\.(css|scss)$/i,
				use:extractTextPlugin.extract({
					fallback:"style-loader",
					use:["css-loader","sass-loader"]
				})
			},{
				test:/\.(png|jpg|jpeg|gif)$/i,
				use:[{
					loader:"url-loader",
					options:{
						limit:5,
						outputPath:"images/"
					}
				}]
			},
			{
		        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/i,
		        loader: 'file-loader',
		        query: {
		          limit: 10000,
		          name: 'images/fonts/[name].[ext]?[hash:7]'
		        }
		    },
		    {
		        test: /\.vue$/,
		        loader: 'vue-loader',
		        exclude: /node_modules/
		    }
		]
	},
    plugins:[
       new htmlWebpackPlugin({
       	   template:"./src/index.html"
       }),
       new extractTextPlugin({
       	filename:(getPath) => {
	        return getPath('styles/[name]@[hash:6].css').replace('styles/scripts', 'styles')
	      }

       })

	],
	optimization: {
    splitChunks: {
      cacheGroups: {
        vue: {
          test: /vue/,
          chunks: 'initial',
          name: 'vendor/vue',
          priority: 10
        }
      }
    }
  }
}