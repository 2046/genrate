const ts = `const url = require('url')
const ejs = require('gulp-ejs')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const RevAll = require('gulp-rev-all')
const postcss = require('gulp-postcss')
const minify = require('gulp-clean-css')
const autoprefixer = require('autoprefixer')
const typescript = require('gulp-typescript')
const sass = require('gulp-sass')(require('sass'))
const RevDel = require('gulp-rev-delete-original')
const browserSync = require('browser-sync').create()
const { src, dest, series, parallel, watch } = require('gulp')

require('dotenv').config({ path: \`.env.\${process.env.NODE_ENV}\` })

const tsProject = typescript.createProject('tsconfig.json')

function cleaner() {
  return src('dist/**', { read: false })
    .pipe(clean({ force: true }))
}

function html() {
  return src('src/**/*.ejs')
    .pipe(ejs({ title: 'Main Page' }))
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
}

function css() {
  return src('src/assets/css/**/*.css')
    .pipe(postcss([ autoprefixer() ]))
    .pipe(minify())
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
}

function scss() {
  return src('src/assets/css/**/*.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(minify())
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
}

function images() {
  return src('src/assets/images/**')
    .pipe(dest('dist/assets/images'))
    .pipe(browserSync.reload({ stream: true }))
}

function js() {
  return src('src/assets/js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('dist/assets/js'))
    .pipe(browserSync.reload({ stream: true }))
}

function ts() {
  return src('src/assets/js/**/*.ts')
    .pipe(tsProject())
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('dist/assets/js'))
    .pipe(browserSync.reload({ stream: true }))
}

function createServer() {
  browserSync.init({
    port: 3004,
    notify: false,
    server: { baseDir: 'dist' }
  })
}

function rev() {
  return src('dist/**')
    .pipe(RevAll.revision({
      dontRenameFile: ['.html'],
      transformPath: function(rev) {
        if (['http', 'https'].some(item => rev.indexOf(item) !== -1)) {
          return rev
        } else if (['http', 'https'].some(item => process.env.APP_PUBLIC_PATH.indexOf(item) !== -1)) {
          return new URL(rev, new URL(process.env.APP_PUBLIC_PATH, 'resolve://')).toString()
        } else {
          return rev
        }
      }
    }))
    .pipe(RevDel())
    .pipe(dest('dist'))
}

function watchFiles() {
  watch('src/**/*.ejs', html)
  watch('src/assets/js/**/*.ts', ts)
  watch('src/assets/js/**/*.js', js)
  watch('src/assets/images/**', images)
  watch('src/assets/css/**/*.css', css)
  watch('src/assets/css/**/*.scss', scss)
}

exports.build = series(cleaner, html, scss, css, ts, js, images, rev)
exports.dev = series(cleaner, html, scss, css, ts, js, images, parallel(watchFiles, createServer))
`

const js = `const url = require('url')
const ejs = require('gulp-ejs')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const RevAll = require('gulp-rev-all')
const postcss = require('gulp-postcss')
const minify = require('gulp-clean-css')
const autoprefixer = require('autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const RevDel = require('gulp-rev-delete-original')
const browserSync = require('browser-sync').create()
const { src, dest, series, parallel, watch } = require('gulp')

require('dotenv').config({ path: \`.env.\${process.env.NODE_ENV}\` })

function cleaner() {
  return src('dist/**', { read: false })
    .pipe(clean({ force: true }))
}

function html() {
  return src('src/**/*.ejs')
    .pipe(ejs({ title: 'Main Page' }))
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
}

function css() {
  return src('src/assets/css/**/*.css')
    .pipe(postcss([ autoprefixer() ]))
    .pipe(minify())
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
}

function scss() {
  return src('src/assets/css/**/*.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(minify())
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
}

function images() {
  return src('src/assets/images/**')
    .pipe(dest('dist/assets/images'))
    .pipe(browserSync.reload({ stream: true }))
}

function js() {
  return src('src/assets/js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('dist/assets/js'))
    .pipe(browserSync.reload({ stream: true }))
}

function createServer() {
  browserSync.init({
    port: 3004,
    notify: false,
    server: { baseDir: 'dist' }
  })
}

function rev() {
  return src('dist/**')
    .pipe(RevAll.revision({
      dontRenameFile: ['.html'],
      transformPath: function(rev) {
        if (['http', 'https'].some(item => rev.indexOf(item) !== -1)) {
          return rev
        } else if (['http', 'https'].some(item => process.env.APP_PUBLIC_PATH.indexOf(item) !== -1)) {
          return new URL(rev, new URL(process.env.APP_PUBLIC_PATH, 'resolve://')).toString()
        } else {
          return rev
        }
      }
    }))
    .pipe(RevDel())
    .pipe(dest('dist'))
}

function watchFiles() {
  watch('src/**/*.ejs', html)
  watch('src/assets/js/**/*.js', js)
  watch('src/assets/images/**', images)
  watch('src/assets/css/**/*.css', css)
  watch('src/assets/css/**/*.scss', scss)
}

exports.build = series(cleaner, html, scss, css, js, images, rev)
exports.dev = series(cleaner, html, scss, css, js, images, parallel(watchFiles, createServer))
`

export default { ts, js }
