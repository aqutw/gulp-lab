var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazyload: true}), // gulp-sequence
    path = require('path');

FOLDER_PATH = '';

gulp.task('task2a',function(){console.log('task2a running...');});
gulp.task('task2b',function(){console.log('task2a running...');});
gulp.task('task2bb',function(){console.log('task2a running...');});
gulp.task('task2bbb',function(){console.log('task2a running...');});
gulp.task('task2c',function(){console.log('task2a running...');});
gulp.task('task2d',function(){console.log('task2a running...');});

gulp.task('task2',function(){
    return $.sequence(
        'task2a',
        ['task2b','task2bb','task2bbb'],
        'task2c',
        'task2d'
    )();
});

/**/
var excludeCSS = ['!' + FOLDER_PATH + 'app/dont-watch-me.less'];
var excludeJS = ['!' + FOLDER_PATH + 'app/dont-watch-me.js'];

gulp.task('make-app-css', function(){
  console.log('make-app-css running.......');
  return gulp.src([FOLDER_PATH + 'app/base.less',
                  FOLDER_PATH + 'app/*.less' // or one file by one file
                  ].concat(excludeCSS))
    .pipe($.concat('app.less'))
    .pipe($.less())
    .pipe($.minifyCss())
    .pipe($.rename('app.css'))
    .pipe(gulp.dest(FOLDER_PATH + 'build/'))

});
gulp.task('make-app-js', function(){
  console.log('make-app-js running.......');
  return gulp.src([FOLDER_PATH + 'app/base.js'
                    , FOLDER_PATH + 'app/*.js' // or one file by one file
                    ].concat(excludeJS))
    .pipe($.concat('app.js'))
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe($.uglify())
    .pipe($.rename('app.js'))
    .pipe(gulp.dest(FOLDER_PATH + 'build/'));
});
gulp.task('make-app-html', function(){
  console.log('make-app-html running.......');
  return gulp.src(FOLDER_PATH + 'app/index.html')
    .pipe($.rename('index.html'))
    .pipe(gulp.dest(FOLDER_PATH + 'build/'))
});
gulp.task('watch', function(){
  gulp.watch([FOLDER_PATH + 'app/*.less'].concat(excludeCSS), ['make-app-css']);
  gulp.watch([FOLDER_PATH + 'app/*.js'].concat(excludeJS), ['make-app-js']);
  gulp.watch([FOLDER_PATH + 'app/*.html'], ['make-app-html']);
});
gulp.task('start', ['make-app-html', 'make-app-js', 'make-app-css']);

gulp.task('default', ['start', 'task2', 'watch']);
