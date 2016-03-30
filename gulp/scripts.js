import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import gulpIf from 'gulp-if';
import webpackStream from 'webpack-stream';
import { argv } from 'yargs';

import config from '../config.js';
const { srcDir, buildDir, distDir, cssDir, jsDir } = config.dir;

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;


// compile es6 to js
export function compileEs6(done) {

  let entry  = {};
  // config.javascript.entry.map(item => {
  //        entry = { ...entry, [item]: `${config.dir.srcDir}${config.dir.jsDir}${item}` };
  //    });
  config.javascript.entry.map(item => {
    // 得到一个入口文件对象
    entry = { ...entry, [item]: `${srcDir + jsDir + item}` };
  })
  gulp.src(`${srcDir + jsDir}*.js`)
    .pipe(webpackStream({
      devtool: production ? '' : 'source-map',
      entry: entry,
      output: {
        path: destDir + jsDir,
        filename: '[name]'
      },
      resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
          'node_modules',
          'src/js/',
          'src/js/vendors',
          'src/js/utils'
        ]
      },
      // watch: stream,
      module: {
        loaders: [{
          loader: 'babel-loader',
          query: config.javascript.babel,
          exclude: [
            path.resolve(__dirname, 'node_modules/'),
            path.resolve(__dirname, 'src/js/vendors')
          ]
        }]
      },
      plugins: [
        new webpack.NoErrorsPlugin()
      ].concat(
        production ? [new webpack.optimize.UglifyJsPlugin(),] : []
      )
    }))
    .pipe(gulp.dest(destDir + jsDir))
    .on('end', done);
}
