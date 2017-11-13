const
gulp = require('gulp'),
babel = require('gulp-babel'),
sass = require('gulp-sass'),
webpack = require('gulp-webpack'),
electron = require('electron-connect').server.create()
runSequence = require('run-sequence');

gulp.task('sass', () => {
    return gulp.src('./src/dev/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('src/build'))
});

gulp.task('react', () => {
    return gulp.src('./src/dev/**/*.js')
                .pipe(babel())
                .pipe(gulp.dest('src/build'));
});

gulp.task('webpack', () => {
    return gulp.src('src/build/main.js')
                .pipe(webpack({output: {filename: 'bundle.js'}, target: "electron"}))
                .pipe(gulp.dest('src/build'))
})
gulp.task('launch', () =>{
    electron.start();
    gulp.watch('app.js', ['restart']);
    gulp.watch(['src/dev/**/*', 'index.html'], () => { runSequence('sass', 'react', 'webpack', 'reload')});
});
gulp.task('reload', () =>{
    electron.reload();
});
gulp.task('restart', () =>{
    electron.restart();
});

gulp.task('watcher', () => {
    
});
