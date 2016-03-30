import gulp from 'gulp';
import del from 'del';
import config from '../config';
import cache from 'gulp-cached';
import { argv } from 'yargs';

const { srcDir, buildDir, distDir} = config.dir;
const production = argv.prod ? true : false;
const destDir = production ? distDir : buildDir;


export function cleanFiles(done) {
  return del([`${destDir}**/*`], done);
};

export function cleanCache(done) {
  cache.caches = {};
  return done();
}
