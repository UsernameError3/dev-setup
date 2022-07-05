const gulp = require('gulp');
const utils = require('./utils/util.js');

const build = (cb) => {
    console.log('Building Application...');
    utils.buildCardJSON();
    cb();
}

gulp.task('build', build);
