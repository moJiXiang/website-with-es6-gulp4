/**
 * michael.mo
 *
 * Date of creative: 2016-3-24
 */
import gulp from 'gulp';
import gulploadplugins from 'gulp-load-plugins'; // this plugin load all plugins named start with `gulp-`

// these modules that gulp task 'scripts' need
import browserSync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import yargs from 'yargs'; // args be a node.js library fer hearties tryin' ter parse optstrings.
import del from 'del';

import config from './config';
const {srcDir, buildDir, distDir, jsDir, cssDir, sassDir} = config.dir;
const websiteURL = config.websiteURL;
const $ = gulploadplugins({
  lazy: true // whether the plugins should be loaded on demand
})
const argv = yargs.argv;

gulp.task('scripts', ()=> {
  return browserify({
    entries: `${srcDir}js/app.js`,
    debug: true,
    transform: [babelify]
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  // generate source map to develop
  .pipe($.if(!argv.production, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(argv.production, $.uglify()))
    // .pipe($.if(argv.production, $.rename({extname: '.min.js'})))
    .on('error', $.util.log)
  .pipe($.if(!argv.production, $.sourcemaps.write()))
  .pipe($.if(!argv.production, gulp.dest(buildDir + jsDir)))
  .pipe($.if(argv.production, gulp.dest(distDir + jsDir)))
})

gulp.task('styles', ()=> {
  return gulp.src([`${srcDir}sass/*.scss`])
    .pipe($.if(!argv.production, $.sourcemaps.init()))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 10 version']}))
    .pipe($.if(argv.production, $.cssnano()))
    // .pipe($.if(argv.production, $.rename({extname: '.min.css'})))
    .pipe($.if(!argv.production, $.sourcemaps.write()))
    .pipe($.if(!argv.production, gulp.dest(buildDir + cssDir)))
    .pipe($.if(argv.production, gulp.dest(distDir + cssDir)))
})

gulp.task('sitemap', ()=> {
  return gulp.src([`${srcDir}*.html`])
    .pipe($.if(argv.production, $.sitemap({siteUrl: websiteURL})))
    .pipe($.if(argv.production, gulp.dest(distDir)))
})

gulp.task('html', ()=> {
  return gulp.src([`${srcDir}*.html`])
    .pipe($.if(argv.production, $.htmlmin({collapseWhitespace: true})))
    .pipe($.if(!argv.production, gulp.dest(buildDir)))
    .pipe($.if(argv.production, gulp.dest(distDir)))
})

// TODO: add this problem to mojixiang.cn
// error
// [16:48:01] The following tasks did not complete: build, <parallel>, clean
// [16:48:01] Did you forget to signal async completion?
// solution
// add done param and call it in del
gulp.task('clean', (done)=> {
    argv.production ? del([distDir], done()) : del([buildDir], done());
})

// Scripts - app.js is the main entry point, you have to import all
// required files and modules
gulp.task("sdk", ()=> {
  return browserify({
    entries: 'buildSdk.js',
    debug: true,
    transform: [babelify]
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'))
})

// compile es6 and sass to js and css
gulp.task('compile', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('sitemap'),
  gulp.parallel('scripts', 'html', 'styles')
))

// use browserSync to listen to change on src files
gulp.task('browserSync', ()=> {
  browserSync({
    notify: false,
    logPrefix: 'HSES6',
    server: {
      baseDir: argv.production ? distDir : buildDir
    }
  })

  gulp.watch([`${srcDir + jsDir}**/*.js`], gulp.series('scripts', browserSync.reload));
  gulp.watch([`${srcDir + sassDir}**/*.scss`], gulp.series('styles', browserSync.reload));
  gulp.watch([`${srcDir}**/*.html`], gulp.series('html', browserSync.reload))
})

// use `gulp serve | gulp serve --production` to test website base in buildDir or distDir
gulp.task('serve', gulp.series('compile', 'browserSync'));
