const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglifyjs');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const config = {
  bowerDir: './bower_components',
  publicDir: './public',
};

gulp.task('fonts', function() {
  return gulp.src([
    config.bowerDir + '/bootstrap-sass/assets/fonts/**/*',
  ])
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('js', function() {
  return gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
  ])
  .pipe(uglify('app.js', {
    compress: false,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('html',function(){
  return gulp.src('./index.hbs')
  .pipe(handlebars({}, {
    ignorePartials: true,
    batch: ['./partials']
  }))
  .pipe(rename({
    extname: '.html'
  }))
  .pipe(gulp.dest('./public'));
});

gulp.task('img',function(){
  return gulp.src('./img/beechwood.svg')
    .pipe(gulp.dest('./public/img'))
});

gulp.task('css', function() {
  return gulp.src('css/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.publicDir + '/css'));
});


gulp.task('default', ['css', 'js', 'fonts', 'html', 'img']);