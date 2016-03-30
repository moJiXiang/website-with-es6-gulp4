import gulp from 'gulp';

import browserSync, {reload} from 'browser-sync';
import config from '../config.js';

import { compileEs6 } from './scripts';
import { compileHtml } from './html';
import { compileStyles } from './styles';

const {srcDir, buildDir, jsDir, sassDir, cssDir} = config.dir;

export function serve() {

  browserSync({
    server: {
      baseDir: config.dir.buildDir
    },
    port: config.server.port,
    online: true
  });

  gulp.watch(`${srcDir}${jsDir}**/*.js`, compileEs6);
  gulp.watch(`${srcDir}${sassDir}**/*.scss`, compileStyles);
  gulp.watch(`${srcDir}**/*.html`, compileHtml);

  gulp.watch(`${buildDir}${jsDir}**/*.js`, ()=> reload());
  gulp.watch(`${buildDir}${cssDir}**/*.css`, ()=> reload());
  gulp.watch(`${buildDir}**/*.html`, ()=> reload());
}
