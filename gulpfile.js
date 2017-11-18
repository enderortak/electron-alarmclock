const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const webpack = require('gulp-webpack');
const mocha = require('gulp-mocha');
const electron = require('electron-connect').server.create();
const runSequence = require('run-sequence');

gulp.task('sass', () => gulp.src('./src/dev/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/build')));

gulp.task('react', () => gulp.src('./src/dev/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('src/build')));

gulp.task('webpack', () => gulp.src('src/build/main.js')
  .pipe(webpack({ output: { filename: 'bundle.js' }, target: "electron" }))
  .pipe(gulp.dest('src/build')));
gulp.task('launch', () => {
  electron.start();
  gulp.watch('app.js', ['restart']);
  gulp.watch(['src/dev/**/*', 'index.html'], () => { runSequence('sass', 'react', 'webpack', 'reload'); });
});
gulp.task('reload', () => {
  electron.reload();
});
gulp.task('restart', () => {
  electron.start();
  electron.restart();
});

gulp.task('test', () =>
  gulp.src('./src/test/**/*.js', { read: false })
    .pipe(mocha({ reporter: 'spec' })));
