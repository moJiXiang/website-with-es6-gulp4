import gulp from 'gulp';
import cache from 'gulp-cached';
import config from '../config';
import { argv } from 'yargs';
import gulpIf from 'gulp-if';
import sitemap from 'gulp-sitemap';

const { srcDir, buildDir, distDir } = config.dir;
const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

export function compileHtml (done) {
  gulp.src(`${config.dir.srcDir}**/*.html`)
    .pipe(cache('html'))
    .pipe(gulpIf(production, sitemap({
      fileName: 'sitemap.xml',
      siteUrl: config.prodURL
    })))
    .pipe(gulp.dest(destDir))
    .on('finish', done)
}
