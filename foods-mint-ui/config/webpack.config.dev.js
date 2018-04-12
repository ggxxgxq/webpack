const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	mode:"development",
	entry:{
	   'app':"./src/app.js"
	},
	output:{
		path:path.resolve(__dirname,"../dev"),
		filename:"[name].js"
	},
	devServer:{
		contentBase:path.resolve(__dirname,"../dev"),
		host:"localhost",
		port:3000,
		proxy: {
	      '/api': {
	        target: 'http://localhost:9000',
	        pathRewrite: {
	          '^/api': ''
	        }
	      }
	    }
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
				use:["style-loader","css-loader","sass-loader"]
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
		    },
		    {
			test: /\.(jsx|js)$/,
			loader: 'babel-loader',
			exclude: /node_modules/
			}

		]
	},
	plugins:[
       new htmlWebpackPlugin({
       	   template:"./src/index.html"
       })

	]
}