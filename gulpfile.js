const gulp = require("gulp");
// const babel = require("gulp-babel");
// const sass = require("gulp-sass");
// const webpackConfig = require("./webpack.config");
const mocha = require("gulp-mocha");
const electronServer = require("electron-connect").server.create({ stopOnClose: true });
const runSequence = require("run-sequence");
const cp = require("child_process");
require('babel-core/register');

gulp.task("webpack", () => {
  cp.exec("webpack");
});

gulp.task("test", () =>
  gulp.src("./test/**/*.js", { read: false })
    .pipe(mocha({
      reporter: "progress", require: "babel-core/register", ui: "tdd", timeout: 999999,
    })));

gulp.task("reload", () => {
  electronServer.reload();
});

gulp.task("restart", () => {
  electronServer.start();
  electronServer.restart();
});

gulp.task("start:dev", () => {
  process.env.NODE_ENV = "development";
  runSequence("webpack");
  // electronServer.start();
  cp.exec("electron .");
});

gulp.task("watch", () => {
  gulp.watch("app.js", ["restart"]);
  gulp.watch(["src/js/**/*", "./dist/index.html"], () => { runSequence("webpack", "test", "reload"); });
});

gulp.task("start:prod", () => {
  process.env.NODE_ENV = "production";
  cp.exec("electron .");
});

