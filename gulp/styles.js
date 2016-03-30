import gulp from 'gulp';

import autoprefixer from 'autoprefixer';
import cssbeautify  from 'gulp-cssbeautify';

import gulpIf from 'gulp-if';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import { argv } from 'yargs';

import config from '../config';
const { srcDir, buildDir, distDir, sassDir, cssDir} = config.dir;
// import handleErrors from 'handleErrors'

const stream = argv.watch ? true : false;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;

export function compileStyles(done) {
  gulp.src(`${srcDir + sassDir}*.scss`)
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer({
        browsers: config.css.autoprefixer
      })
    ]))
    .pipe(gulpIf(stream, cssbeautify()))
    .pipe(gulpIf(stream, sourcemaps.write('.')))
    .pipe(gulpIf(production, cssnano()))
    .pipe(gulp.dest(`${destDir + cssDir}`))
    .on('end', done)
}
