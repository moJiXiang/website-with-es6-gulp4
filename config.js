export default {
  server: {
    port: 8000
  },
  dir: {
    srcDir: __dirname + '/src/',
    buildDir: __dirname + '/build/',
    distDir: __dirname + '/dist/',
    cssDir: 'css/',
    imgDir: 'img/',
    jsDir: 'js/',
    sassDir: 'sass/',
    fontsDir: 'fonts/'
  },
  css: {
    autoprefixer: ['>98%']
  },
  prodURL: 'www.test.com',
  javascript: {
    entry: ['index.js'],
    babel: { presets: ['es2015'] }
  }
}
