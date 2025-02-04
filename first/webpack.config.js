const path = require('path');
// const globby = require('globby');

module.exports = (env, argv) => {
  const config = {
    entry: {
      'pages/help/index':  './src/pages/help/index.jsx',
      'pages/index/index':  './src/pages/index/index.jsx',
      'pages/simple/index':  './src/pages/simple/index.jsx',
      'pages/form/index':  './src/pages/form/index.jsx',
    },
    output: {
      path: path.resolve('build'),
      publicPath: 'build',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'moment': 'moment',
      '@alifd/next': 'Next'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      // TODO 演示 路径 alias
      alias: {
        components: path.join(__dirname, 'src/components'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            // 主题
            {
              loader: '@alifd/next-theme-loader',
              options: {
                theme: '@alifd/theme-1',
                // TODO
              },
            }
          ],
        },
      ],
    },
    optimization: {
      minimize: false
    },
  }

  if (argv.mode === 'development') {
    config.devtool = 'source-map';

    // 开发环境本地 web 服务
    config.devServer = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      stats: {
        chunks: false,
        children: false,
        modules: false,
        chunkModules: false,
      },
    };

    setTimeout(() => console.log(`\n--------------- open http://127.0.0.1:${argv.port}/demos/index.html ---------------\n`))
  }

  if (argv.mode === 'production') {
    //...
  }

  // TODO 演示更快捷的方式
  // const entry = {};
  // const cwd = process.cwd();
  // const files = globby.sync(['**/pages/*'], { cwd: `${cwd}/src` });
  // files.forEach((item) => {
  //   entry[`${item}/index`] = [`./src/${item}/index.jsx`];
  // });
  // config.entry = entry

  return config;
};
