### Some import develop packages
> github:gulpjs/gulp#4.0

npm install gulpjs/gulp#4.0

> gulp-sitemap

Easily generate a search engine friendly sitemap.xml from your project.

:bowtie: Search engines love the sitemap.xml and it helps SEO as well.


> gulp with babel

need to install `babel-core`, `babel-preset-es2015`, `babel-register`

> browserify

use it compile es6 to commonJs.

> yargs

Yargs be a node.js library fer hearties tryin' ter parse optstrings.

With yargs, ye be havin' a map that leads straight to yer treasure! Treasure of course, being a simple option hash.



### notify

> `gulp@4.0 error`

```
// error
// [16:48:01] The following tasks did not complete: build, <parallel>, clean
// [16:48:01] Did you forget to signal async completion?
// solution
// add done param and call it in del
gulp.task('clean', (done)=> {
    argv.production ? del([distDir], done()) : del([buildDir], done());
}
```

> `.babelrc`


```
{
  // 设置转码规则
  // es2015转码规则
  // es7不同阶段语法提案的转码规则，babel-preset-stage-0
  "presets": [],
  "plugins": []
}
```

### How to use

```
// compile all files in build directory
gulp compile

// compile all files in dist directory
gulp compile --production

// develop with browser-sync
gulp serve
```
