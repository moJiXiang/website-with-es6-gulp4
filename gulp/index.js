/**
 * Load tasks and export globals
 */

import gulp from 'gulp';
import { serve } from './serve';
import { argv } from 'yargs';

import config from '../config';

const { srcDir, buildDir, distDir, jsDir, sassDir } = config.dir;
const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

import { compileEs6 } from './scripts';
import { compileHtml } from './html';
import { compileStyles } from './styles';
import { cleanFiles, cleanCache } from './clean';
// build
// gulp.task(
//   'build',
//   gulp.parallel('scripts', 'styles', buildSitemap)
// )
//
// 传递一个具名函数作为参数，将自动注册以该函数名命名的任务
gulp.task(serve);
// gulp.task('serve', serve);


gulp.task('scripts', compileEs6);

gulp.task('html', compileHtml);

gulp.task('styles', compileStyles);

gulp.task(
  'clean',
  gulp.parallel(cleanFiles, cleanCache)
);

// 开发环境
gulp.task(
  'dev',
  gulp.series(
    gulp.parallel('clean'),
    gulp.parallel('scripts', 'html', 'styles'),
    gulp.parallel('serve')
  )
)

// 生产环境
gulp.task(
  'prod',
  gulp.series(
    gulp.parallel('clean'),
    gulp.parallel('scripts', 'html', 'styles')
  )
);
